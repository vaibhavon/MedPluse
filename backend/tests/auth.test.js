const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const seedUsers = require("../seed/defaultUsers");

let app;
let mongoServer;

beforeAll(async () => {
  // Raise rate limits so the many requests in this suite are not throttled,
  // and pin a JWT secret. No EMAIL_* vars -> email is disabled, so login
  // returns devOtp (NODE_ENV is "test", not "production").
  process.env.LOGIN_RATE_MAX = "1000";
  process.env.OTP_RATE_MAX = "1000";
  process.env.JWT_SECRET = "test-secret";

  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  await seedUsers();

  // Import after env + DB are ready; the app exports itself without listening.
  app = require("../server");
}, 60000);

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

async function loginAndGetToken(email, password) {
  const login = await request(app).post("/api/login").send({ email, password });
  const otp = login.body.devOtp;
  const verify = await request(app)
    .post("/api/verify-otp")
    .send({ email, otp });
  return verify.body.token;
}

describe("health", () => {
  test("GET /health returns ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});

describe("login + OTP", () => {
  test("rejects wrong password with 401", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: "admin@med.com", password: "wrong" });
    expect(res.status).toBe(401);
  });

  test("valid login returns a 6-digit devOtp; verify returns role + token", async () => {
    const login = await request(app)
      .post("/api/login")
      .send({ email: "admin@med.com", password: "123" });
    expect(login.status).toBe(200);
    expect(login.body.otpRequired).toBe(true);
    expect(login.body.devOtp).toMatch(/^\d{6}$/);

    const verify = await request(app)
      .post("/api/verify-otp")
      .send({ email: "admin@med.com", otp: login.body.devOtp });
    expect(verify.body.success).toBe(true);
    expect(verify.body.role).toBe("admin");
    expect(typeof verify.body.token).toBe("string");
  });

  test("wrong OTP is rejected", async () => {
    await request(app)
      .post("/api/login")
      .send({ email: "doctor@med.com", password: "123" });
    const verify = await request(app)
      .post("/api/verify-otp")
      .send({ email: "doctor@med.com", otp: "000000" });
    expect(verify.body.success).toBe(false);
  });

  test("login is case-insensitive on email", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: "ADMIN@MED.COM", password: "123" });
    expect(res.status).toBe(200);
    expect(res.body.devOtp).toMatch(/^\d{6}$/);
  });
});

describe("protected routes", () => {
  test("GET /api/patients without a token -> 401", async () => {
    const res = await request(app).get("/api/patients");
    expect(res.status).toBe(401);
  });

  test("garbage token -> 401", async () => {
    const res = await request(app)
      .get("/api/patients")
      .set("Authorization", "Bearer not.a.real.token");
    expect(res.status).toBe(401);
  });

  test("GET /api/patients with a valid token -> 200 array", async () => {
    const token = await loginAndGetToken("admin@med.com", "123");
    const res = await request(app)
      .get("/api/patients")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("admin can create a patient (201)", async () => {
    const token = await loginAndGetToken("admin@med.com", "123");
    const res = await request(app)
      .post("/api/patients")
      .set("Authorization", `Bearer ${token}`)
      .send({ patientId: "PJEST1", name: "Jest Patient", age: 33 });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Jest Patient");
  });

  test("patient role cannot create a patient (403)", async () => {
    const token = await loginAndGetToken("patient@med.com", "123");
    const res = await request(app)
      .post("/api/patients")
      .set("Authorization", `Bearer ${token}`)
      .send({ patientId: "PJEST2", name: "Should Fail", age: 1 });
    expect(res.status).toBe(403);
  });

  test("doctor role cannot create a doctor; admin can", async () => {
    const doctorToken = await loginAndGetToken("doctor@med.com", "123");
    const forbidden = await request(app)
      .post("/api/doctors")
      .set("Authorization", `Bearer ${doctorToken}`)
      .send({ doctorId: "DJEST1", name: "Dr Nope", specialization: "X" });
    expect(forbidden.status).toBe(403);

    const adminToken = await loginAndGetToken("admin@med.com", "123");
    const created = await request(app)
      .post("/api/doctors")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ doctorId: "DJEST1", name: "Dr Yes", specialization: "Cardiology" });
    expect(created.status).toBe(201);
  });
});
