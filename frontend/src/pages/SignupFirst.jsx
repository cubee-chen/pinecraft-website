import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";

function SignupFirst() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwdError, setPwdError] = useState("");
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleTempRegister = async (e) => {
    e.preventDefault();

    // Validate password
    if (!passwordRegex.test(password)) {
      setPwdError("密碼需要至少8個字符，包含大寫字母、小寫字母及數字");
      return;
    }
    setPwdError("");

    const response = await fetch(`${API_BASE_URL}/api/auth/register-temp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      navigate(`/signup-second?email=${encodeURIComponent(email)}`);
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>註冊</h2>
        <form className="login-form" onSubmit={handleTempRegister}>
          <input
            type="test"
            placeholder="用戶名稱"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="電子信箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {pwdError && (
            <p style={{ color: "red", fontSize: "14px" }}>{pwdError}</p>
          )}
          <button className="login-button" type="submit">
            下一步
          </button>
        </form>

        {/* Back to Login */}
        <div className="register-link">
          <span>已經有帳號了嗎？ </span>
          <Link to="/login">返回登入</Link>
        </div>
      </div>
    </div>
  );
}

export default SignupFirst;
