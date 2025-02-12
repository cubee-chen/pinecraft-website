import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function TokenInputSubmit({ notionToken, setNotionToken }) {
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [email, setEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract email from URL
    const params = new URLSearchParams(location.search);
    const emailFromURL = params.get("email");

    if (!emailFromURL) {
      alert("錯誤: 無法取得使用者 email");
      navigate("/register");
    } else {
      setEmail(emailFromURL);
    }
  }, [location, navigate]);

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_BASE_URL}/api/auth/final-register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, notionToken }),
    });

    if (response.ok) {
      alert("註冊成功！");
      navigate("/login");
    } else {
      alert("註冊失敗");
    }
  };

  return (
      <div className="step-container">
  
        <form className="register-form" onSubmit={handleFinalSubmit}>
            <input
              type="text"
              className="step-input"
              placeholder="API Token"
              value={notionToken}
              onChange={(e) => setNotionToken(e.target.value)}
              required
            />
            <button className="step-button" type="submit">
              確認
            </button>
        </form>
      </div>
    );
  }

  export default TokenInputSubmit;
  