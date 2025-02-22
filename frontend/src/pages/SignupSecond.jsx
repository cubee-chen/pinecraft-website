import { useState } from "react";
import TokenInput from "../components/TokenInputSubmit";
import "../css/SignupSecond.css";

function SignupSecond() {
  const [step, setStep] = useState(1);
  const [notionToken, setNotionToken] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");
  const navigate = useNavigate();

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_BASE_URL}/api/auth/update-profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // to send session cookies
      body: JSON.stringify({ age, gender, job }),
    });
    if (response.ok) {
      console.log("資料更新成功");
    } else {
      alert("資料更新失敗");
    }
  };

  return (
    <div className="notion-setup-container">
      <div className={`notion-box ${step === 1 ? "caution" : ""}`}>
        {/* Step 1: 補充其他個資 */}
        {step === 1 && (
          <div className="step-container">
            <h2>請補充您的資料</h2>
            <form onSubmit={handleProfileSubmit}>
              <input
                type="number"
                placeholder="年齡"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="性別"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="工作或主修系所"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                required
              />
              <button type="submit">下一步</button>
            </form>
          </div>
        )}
        {/* Step 2: 注意事項 */}
        {step === 2 && (
          <div className="step-container">
            <h2 className="step-title">請閱讀並同意以下注意事項</h2>
            <ul className="step-list-caution">
              <li>本系統會請求您的 Notion API Token</li>
              <li>請確保授權的範圍足夠使用該模板</li>
              <li>誤盜用他人的 API Token</li>
            </ul>
            <button className="step-button" onClick={() => setStep(3)}>
              我同意，開始授權
            </button>
          </div>
        )}

        {/* Step 3: Notion 授權教學 + Token 輸入 */}
        {step === 3 && (
          <div className="step-container">
            <h2 className="step-title">如何授權 Notion API？</h2>
            <p className="step-text">按照以下步驟來授權：</p>
            <ol className="step-list">
              <li>
                前往{" "}
                <a
                  href="https://www.notion.so/my-integrations"
                  target="_blank"
                  className="step-link"
                >
                  Notion Integration
                </a>
              </li>
              <li>
                創建新的 Integration！
                <img
                  src="/images/integration-tutorial-1.png"
                  alt="Notion API 設定教學"
                  className="step-image"
                />
              </li>
              <li>
                輸入以下資訊後，點擊右下角的「Save」，系統會自動進到下一頁設定。
                <img
                  src="/images/integration-tutorial-2.png"
                  alt="Notion API 設定教學"
                  className="step-image"
                />
                <img
                  src="/images/integration-tutorial-3.png"
                  alt="Notion API 設定教學"
                  className="step-image"
                />
              </li>
              <li>
                點擊「Show」、「Copy」以複製你的API Token。
                <img
                  src="/images/integration-tutorial-4.png"
                  alt="Notion API 設定教學"
                  className="step-image"
                />
                <img
                  src="/images/integration-tutorial-5.png"
                  alt="Notion API 設定教學"
                  className="step-image"
                />
              </li>
              <li>
                下滑頁面，勾選 **Comment Capabilities**
                的「Read」和「Insert」，最後右下角「Save」以儲存。
                <img
                  src="/images/integration-tutorial-6.png"
                  alt="Notion API 設定教學"
                  className="step-image"
                />
              </li>
              <li>請貼上您剛才複製的 API Token</li>
            </ol>
            <TokenInput
              notionToken={notionToken}
              setNotionToken={setNotionToken}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SignupSecond;
