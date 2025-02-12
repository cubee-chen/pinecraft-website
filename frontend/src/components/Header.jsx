import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../store/slices/authSlice";
import "../css/Header.css";

function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [scrolled, setScrolled] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    alert("登出成功");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert("搜尋功能尚未開放，敬請期待！");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/">Pinecraft</Link>
        </div>

        <div className="nav-links">
          {/* If user is logged in, show "購買紀錄" & "登出"; otherwise show "登入" */}
          {user ? (
            <>
              <Link to="/purchased-templates">購買紀錄</Link>
              <button onClick={handleLogout}>登出</button>
            </>
          ) : (
            <Link to="/login">登入</Link>
          )}

          <Link to="/about-us">關於我們</Link>
          <button className="search-button" onClick={handleSearch}>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
