import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfileThunk } from "../store/slices/authSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import "../css/layout/MainLayout.css";

function MainLayout() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // On initial mount, attempt to fetch profile if user is null
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfileThunk());
    }
  }, [user, dispatch]);

  return (
    <>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
