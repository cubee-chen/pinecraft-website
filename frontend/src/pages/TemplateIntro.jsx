// src/pages/template-intro/TemplateIntro.jsx
import { useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import ProductIntro from "../components/ProductIntro";
import "../css/TemplateIntro.css";

function TemplateIntro() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [searchParams] = useSearchParams();
  const templateName = searchParams.get("templatename") || "未知模板";
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // CRM Update
    fetch(`${API_BASE_URL}/api/crm/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "randomPerson",
        crmKey: "templateIntroPage.viewTime",
        crmValue: new Date().getTime(),
      }),
    });
  }, [API_BASE_URL]);

  // You can optionally fetch template details here if needed
  // For now we assume static instructions

  const handleBuy = () => {
    // Navigate to the protected TemplateDeliver page
    navigate(`/template-deliver?templatename=${encodeURIComponent(templateName)}`);
  };

  return (
    <>
      <div>
        <ProductIntro templateName={templateName} handleBuy={handleBuy}/>
      </div>
      {/* <div className="template-intro-container">
        <h1 className="intro-title">{templateName} - 模板介紹</h1>
        <button className="intro-buy-button" onClick={handleBuy}>
          購買模板
        </button>
        <Link to="/" className="intro-back-link">返回首頁</Link>
      </div> */}
    </>
  );
}

export default TemplateIntro;
