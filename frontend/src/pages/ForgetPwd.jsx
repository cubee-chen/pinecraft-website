// src/pages/ForgetPwd.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css";

function ForgetPwd() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate password locally:
    if (!passwordRegex.test(newPassword)) {
      setErrorMsg("密碼需要至少8個字符，包含大寫字母、小寫字母及數字");
      return;
    }
    setErrorMsg("");

    try {
      const resp = await fetch(`${API_BASE_URL}/api/auth/forget-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await resp.json();
      if (resp.ok) {
        alert("密碼更改成功");
        navigate("/login");
      } else {
        setErrorMsg(data.message || "更改失敗");
      }
    } catch (error) {
      setErrorMsg("伺服器錯誤，請稍後再試");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>重設密碼</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="電子信箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="新密碼"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
          <button type="submit" className="login-button">
            確認
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPwd;
