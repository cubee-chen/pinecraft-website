import "../css/Login.css";
import GoogleLogo from "../assets/google-icon.svg";

function Login() {
  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = `${
      import.meta.env.VITE_API_BASE_URL
    }/api/auth/google`;
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>登入</h2>
        <button onClick={handleGoogleLogin} className="google-button">
          <img
            src={ GoogleLogo }
            alt="Google Logo"
            className="google-icon"
          />
          <span>使用 Google 帳號登入</span>
        </button>
      </div>
    </div>
  );
}

export default Login;
