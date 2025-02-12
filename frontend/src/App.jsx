import { Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import NoHeaderLayout from "./layouts/NoHeaderLayout";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import TemplateDeliver from "./pages/TemplateDeliver";
import PurchasedHistory from "./pages/PurchasedHistory";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import ForgetPwd from "./pages/ForgetPwd";
import SignupSecond from "./pages/SignupSecond";
import SignupFirst from "./pages/SignupFirst";
import TemplateIntro from "./pages/TemplateIntro";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <Routes>
      {/* 1) Auth pages: uses AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup-first" element={<SignupFirst />} />
        <Route path="/signup-second" element={<SignupSecond />} />
        <Route path="/forget-password" element={<ForgetPwd />} />
      </Route>

      {/* 2) Main layout: has normal header/footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/template-intro" element={<TemplateIntro />} />

        {/* Protected pages */}
        <Route
          path="/template-deliver"
          element={
            <ProtectedRoute>
              <TemplateDeliver />
            </ProtectedRoute>
          }
        />
        <Route
          path="/purchased-templates"
          element={
            <ProtectedRoute>
              <PurchasedHistory />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 3) No header/footer for 404 */}
      <Route element={<NoHeaderLayout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
