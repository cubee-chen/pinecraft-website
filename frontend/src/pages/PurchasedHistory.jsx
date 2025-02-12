import { useEffect } from "react";
import { useSelector } from "react-redux";
import "../css/PurchasedHistory.css";

function PurchasedHistory() {
  const { user } = useSelector((state) => state.auth);
  const purchasedTemplates = user?.purchasedTemplates || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If not logged in:
  if (!user) {
    return (
      <div className="container">
        <h2 className="title">尚未登入</h2>
        <p className="no-purchase">請先登入查看購買紀錄。</p>
      </div>
    );
  }

  // Logged in user
  return (
    <div className="container">
      <h2 className="title">購買紀錄</h2>

      {purchasedTemplates.length === 0 ? (
        <p className="no-purchase">目前尚未購買任何模板</p>
      ) : (
        <div className="purchase-grid">
          {purchasedTemplates.map((templateName, index) => (
            <div key={index} className="purchase-item">
              <h3>{templateName}</h3>
              <p>感謝您的選購！</p>
            </div>
          ))}
        </div>
      )}

      <button
        className="back-button"
        onClick={() => (window.location.href = "/")}
      >
        返回首頁
      </button>
    </div>
  );
}

export default PurchasedHistory;
