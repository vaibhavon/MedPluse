const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let app;
let mongoServer;

const DEMO_PASSWORD = "1234";

beforeAll(async () => {
  // Raise rate limits so the many requests in this suite are not throttled,
  // pin a JWT secret, and pin the demo password. No EMAIL_* vars -> email is
  // disabled, so login returns devOtp (NODE_ENV is "test", not "production").
  process.env.LOGIN_RATE_MAX = "1000";
  process.env.OTP_RATE_MAX = "1000";
  process.env.JWT_SECRET = "test-secret";
  process.env.DEMO_USER_PASSWORD = DEMO_PASSWORD;

  // The resource routes use Mongoose models, so back them with an in-memory DB.
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  app = require("../server");
}, 60000);

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

// Full demo login: any email + shared password + chosen role -> JWT.
async function loginAndGetToken(email, role) {
  const login = await request(app)
    .post("/api/login")
    .send({ email, password: DEMO_PASSWORD, role });
  const verify = await request(app)
    .post("/api/verify-otp")
    .send({ email, otp: login.body.devOtp });
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
      .send({ email: "user@example.com", password: "wrong", role: "admin" });
    expect(res.status).toBe(401);
  });

  test("rejects a missing/invalid role with 400", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: "user@example.com", password: DEMO_PASSWORD });
    expect(res.status).toBe(400);
  });

  test("valid login returns devOtp; verify returns the chosen role + token", async () => {
    const login = await request(app)
      .post("/api/login")
      .send({ email: "user@example.com", password: DEMO_PASSWORD, role: "admin" });
    expect(login.status).toBe(200);
    expect(login.body.otpRequired).toBe(true);
    expect(login.body.devOtp).toMatch(/^\d{6}$/);

    const verify = await request(app)
      .post("/api/verify-otp")
      .send({ email: "user@example.com", otp: login.body.devOtp });
    expect(verify.body.success).toBe(true);
    expect(verify.body.role).toBe("admin");
    expect(typeof verify.body.token).toBe("string");
  });

  test("the role in the token follows the user's selection", async () => {
    const login = await request(app)
      .post("/api/login")
      .send({ email: "doc@example.com", password: DEMO_PASSWORD, role: "doctor" });
    const verify = await request(app)
      .post("/api/verify-otp")
      .send({ email: "doc@example.com", otp: login.body.devOtp });
    expect(verify.body.role).toBe("doctor");
  });

  test("wrong OTP is rejected", async () => {
    await request(app)
      .post("/api/login")
      .send({ email: "user2@example.com", password: DEMO_PASSWORD, role: "patient" });
    const verify = await request(app)
      .post("/api/verify-otp")
      .send({ email: "user2@example.com", otp: "000000" });
    expect(verify.body.success).toBe(false);
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
    const token = await loginAndGetToken("admin@example.com", "admin");
    const res = await request(app)
      .get("/api/patients")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("admin can create a patient (201)", async () => {
    const token = await loginAndGetToken("admin@example.com", "admin");
    const res = await request(app)
      .post("/api/patients")
      .set("Authorization", `Bearer ${token}`)
      .send({ patientId: "PJEST1", name: "Jest Patient", age: 33 });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Jest Patient");
  });

  test("patient role cannot create a patient (403)", async () => {
    const token = await loginAndGetToken("p@example.com", "patient");
    const res = await request(app)
      .post("/api/patients")
      .set("Authorization", `Bearer ${token}`)
      .send({ patientId: "PJEST2", name: "Should Fail", age: 1 });
    expect(res.status).toBe(403);
  });

  test("doctor role cannot create a doctor; admin can", async () => {
    const doctorToken = await loginAndGetToken("d@example.com", "doctor");
    const forbidden = await request(app)
      .post("/api/doctors")
      .set("Authorization", `Bearer ${doctorToken}`)
      .send({ doctorId: "DJEST1", name: "Dr Nope", specialization: "X" });
    expect(forbidden.status).toBe(403);

    const adminToken = await loginAndGetToken("admin@example.com", "admin");
    const created = await request(app)
      .post("/api/doctors")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ doctorId: "DJEST1", name: "Dr Yes", specialization: "Cardiology" });
    expect(created.status).toBe(201);
  });
});
