import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/authSlice";
import { switchSystem } from "../../redux/ErpCrmSlice";
import { addInquiry } from "../../utils/inquiryStorage";
import { apiUrl } from "../../config/api";
import "./login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);

  // ERP LOGIN STATES
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);

  // INQUIRY STATES
  const [inqName, setInqName] = useState("");
  const [inqComplaint, setInqComplaint] = useState("");

  // FEEDBACK STATES
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Helper to reset messages when switching tabs
  const handleToggle = (status) => {
    setIsActive(status);
    setError("");
    setSuccess("");
    // Reset OTP states if switching away
    if (!status) {
      setShowOtpBox(false);
      setOtp("");
    }
  };

  /* ================= ERP LOGIN ================= */
  const handleLoginSubmit = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(apiUrl("/api/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: id, password }),
      });

      const data = await res.json();

      if (data.otpRequired) {
        setShowOtpBox(true);

        if (data.devOtp) {
          // Dev mode: the backend can't deliver mail to the demo test
          // accounts, so it returns the OTP inline. Auto-fill it so the
          // login flow is usable without a real inbox. In production the
          // backend omits devOtp and this branch never runs.
          setOtp(data.devOtp);
          setSuccess(`Dev mode: OTP auto-filled (${data.devOtp}). Click Verify OTP.`);
        } else {
          setSuccess("OTP sent to your email.");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */
  const handleVerifyOtp = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(apiUrl("/api/verify-otp"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: id, otp }),
      });

      const data = await res.json();

      if (data.success) {
        dispatch(login({ system: "ERP", id, role: data.role }));
        dispatch(switchSystem("ERP"));

        const roleRedirectMap = {
          admin: "/dashboard",
          doctor: "/dashboard/doctorTaskPanel",
          patient: "/dashboard/MyAppointments",
          receptionist: "/dashboard/appointments",
        };

        navigate(roleRedirectMap[data.role] || "/dashboard");
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch (err) {
      setError("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= INQUIRY SUBMIT ================= */
  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!inqName || !inqComplaint) {
      setError("Please fill all fields");
      return;
    }

    addInquiry({
      id: "INQ" + Date.now(),
      name: inqName,
      complaint: inqComplaint,
      status: "New",
      date: new Date().toLocaleString(),
    });

    setSuccess("Inquiry submitted successfully");
    setInqName("");
    setInqComplaint("");
  };

  return (
    <div className="login-page">
      <div className={`container-login ${isActive ? "active" : ""}`} id="container">
        
        {/* LOGIN FORM (Right side when active) */}
        <div className="form-container sign-up">
          <form onSubmit={showOtpBox ? (e) => e.preventDefault() : handleLoginSubmit}>
            <h1>LOGIN</h1>
            <span>Use your credentials</span>
            
            <input
              type="email"
              placeholder="ERP Email ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              disabled={showOtpBox}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={showOtpBox}
              required
            />

            {/* OTP BOX */}
            {showOtpBox && (
              <div className="otp-container">
                <span className="otp-instruction">Please enter the 6-digit code sent to your email</span>
                <input
                  type="text"
                  placeholder="000000"
                  maxLength="6"
                  className="otp-input"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  autoFocus
                />
                <button 
                  className="container-button verify-btn" 
                  type="button" 
                  onClick={handleVerifyOtp}
                  disabled={loading || otp.length < 6}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
                <p className="resend-text" onClick={handleLoginSubmit}>
                  Didn't receive code? <span>Resend</span>
                </p>
              </div>
            )}

            {/* DEFAULT LOGIN BUTTON */}
            {!showOtpBox && (
              <button className="container-button" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Log In"}
              </button>
            )}

            {error && <p className="error-msg">{error}</p>}
            {success && <p className="success-msg">{success}</p>}
          </form>
        </div>

        {/* INQUIRY FORM (Left side) */}
        <div className="form-container sign-in">
          <form onSubmit={handleInquirySubmit}>
            <h1>INQUIRY</h1>
            <span>We are here to help</span>
            <input
              type="text"
              placeholder="Name"
              value={inqName}
              onChange={(e) => setInqName(e.target.value)}
              required
            />
            <textarea
              placeholder="Describe your complaint..."
              value={inqComplaint}
              onChange={(e) => setInqComplaint(e.target.value)}
              rows="4"
              required
            ></textarea>
            <button className="container-button" type="submit">
              Submit Inquiry
            </button>
            
            {error && <p className="error-msg">{error}</p>}
            {success && <p className="success-msg">{success}</p>}
          </form>
        </div>

        {/* TOGGLE PANELS */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Need to report an issue or ask a question?</p>
              <button className="hidden" onClick={() => handleToggle(false)}>
                Go to Inquiry
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Access your medical dashboard and ERP system</p>
              <button className="hidden" onClick={() => handleToggle(true)}>
                Go to Login
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
