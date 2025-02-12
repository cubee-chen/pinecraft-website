// src/pages/template-intro/TemplateIntro.jsx
import { useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import "../css/TemplateIntro.css";

function TemplateIntro() {
  const [searchParams] = useSearchParams();
  const templateName = searchParams.get("templatename") || "未知模板";
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // You can optionally fetch template details here if needed
  // For now we assume static instructions

  const handleBuy = () => {
    // Navigate to the protected TemplateDeliver page
    navigate(`/template-deliver?templatename=${encodeURIComponent(templateName)}`);
  };

  return (
    <div className="template-intro-container">
      <h1 className="intro-title">{templateName} - 模板介紹</h1>
      <button className="intro-buy-button" onClick={handleBuy}>
        購買模板
      </button>
      <Link to="/" className="intro-back-link">返回首頁</Link>
    </div>
  );
}

export default TemplateIntro;
