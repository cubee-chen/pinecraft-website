import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../store/slices/authSlice";
import "../css/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginThunk({ email, password }));
    if (loginThunk.fulfilled.match(resultAction)) {
      // navigate upon successful login
      navigate("/");
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to your backend Google OAuth endpoint
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`;
  };

  // return (
  //   <div className="login-container">
  //     <div className="login-box">
  //       <h2>登入</h2>
  //       <form className="login-form" onSubmit={handleLogin}>
  //         <input
  //           type="email"
  //           placeholder="電子信箱"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //           required
  //         />
  //         <input
  //           type="password"
  //           placeholder="密碼"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //           required
  //         />
  //         <button className="login-button" type="submit" disabled={loading}>
  //           {loading ? "登入中..." : "登入"}
  //         </button>
  //       </form>
  //       {error && <p style={{ color: "red" }}>{error}</p>}

  //       {/* Register Link */}
  //       <div className="register-link">
  //         <span>還沒有帳號嗎？ </span>
  //         <Link to="/signup-first">立即註冊</Link>
  //       </div>
  //       <div className="register-link">
  //         <Link to="/forget-password">忘記密碼?</Link>
  //       </div>
  //     </div>
  //   </div>
  // );


  return (
    <div className="login-container">
      <div className="login-box">
        <h2>登入</h2>
        {/* Existing email/password form */}
        {/* ... */}
        <button onClick={handleGoogleLogin} className="google-button">
          Sign in with Google
        </button>
        {/* Additional links */}
        <div className="register-link">
          <span>還沒有帳號嗎？ </span>
          <Link to="/signup-first">立即註冊</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
