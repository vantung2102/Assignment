import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/404/NotFound";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Home";
import StaffPage from "./pages/StaffPage/StaffPage";
import StaffProfile from "./pages/StaffProfile/StaffProfile";

function App() {
  return (
    <div className="App">
      {/* <Header /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot_password" element={<ForgotPassword />} />

        <Route path="staff_management">
          <Route path="staff" element={<StaffPage />}></Route>
          <Route path="staff/:id" element={<StaffProfile />}></Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
