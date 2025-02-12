import { useState, useEffect } from "react";
import TemplateCard from "../components/TemplateCard";
import "../css/Home.css";

function Home() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        // Use the public domain from .env
        const resp = await fetch(`${API_BASE_URL}/api/template/get`)
        if (!resp.ok) {
          throw new Error(`HTTP error! ${resp.status}`);
        }
        const data = await resp.json();
        setTemplates(data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };
    fetchTemplates();
  }, [API_BASE_URL]);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Pinecraft</h1>
          <h3>智慧運算、效能進化</h3>
          <blockquote>Crafting Your Notion Experience</blockquote>
        </div>
      </section>
      {/*Our vision section*/}
      <section className="intro-section">
        <h2>打造屬於你的生產力套件</h2>
        <p>
          PINECRAFT 致力於開發 Notion 模板，並且整合後端伺服器與 AI 驅動，提供最佳的生產力工具。
        </p>
      </section>
      {/* products demo */}
      <div className="products-grid">
        {templates.map((template, index) => (
          <TemplateCard
            key={template._id}
            template={template}
            isReversed={index % 2 !== 0}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
