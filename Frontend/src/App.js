import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/404/NotFound";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import HomePage from "./pages/Home/HomePage";
import StaffPage from "./pages/StaffPage/StaffPage";
import StaffProfile from "./pages/ProfilePage/ProfilePage";
import DepartmentPage from "./pages/DepartmentPage/DepartmentPage";
import PositionPage from "./pages/PositionPage/PositionPage";
import JobTitlePage from "./pages/JobTitlePage/JobTitlePage";
import RequireAuth from "./common/router/RequireAuth";
import PropertiesGroupPage from "./pages/PropertiesGroupPage/PropertiesGroupPage";
import PropertyPage from "./pages/PropertyPage/PropertyPage";
import RequestPropertyPage from "./pages/RequestPropertyPage/RequestPropertyPage";
import DetailRequestPropertyPage from "./pages/DetailRequestPropertyPage/DetailRequestPropertyPage";
import PropertyProvidingHistoriesPage from "./pages/PropertyProvidingHistories/PropertyProvidingHistoriesPage";
import DetailPropertyProvidingHistoriesPage from "./pages/PropertyProvidingHistoriesPage/DetailPropertyProvidingHistoriesPage";
import LeavePage from "./pages/LeavePage/LeavePage";
import DetailLeavePage from "./pages/DetailLeavePage/DetailLeavePage";
import LeaveApplicationPage from "./pages/LeaveApplicationPage/LeaveApplicationPage";
import DetailLeaveApplicationPage from "./pages/DetailLeaveApplicationPage/DetailLeaveApplicationPage";
import DetailPropertyPage from "./pages/DetailPropertyPage/DetailPropertyPage";
import HistoriesByPropertyPage from "./pages/HistoriesByPropertyPage/HistoriesByPropertyPage";
import OnboardingSamplePage from "./pages/OnboardingSamplePage/OnboardingSamplePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="forgot_password" element={<ForgotPassword />} />

        {/* ================ Home ================ */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />

        {/* ================ Staff Management ================ */}
        <Route path="staff_management">
          <Route
            path="staff"
            element={
              <RequireAuth>
                <StaffPage />
              </RequireAuth>
            }
          />

          <Route
            path="staff/:id"
            element={
              <RequireAuth>
                <StaffProfile />
              </RequireAuth>
            }
          />
          <Route
            path="departments"
            element={
              <RequireAuth>
                <DepartmentPage componentName={"Department"} />
              </RequireAuth>
            }
          />
          <Route
            path="positions"
            element={
              <RequireAuth>
                <PositionPage />
              </RequireAuth>
            }
          />
          <Route
            path="job_titles"
            element={
              <RequireAuth>
                <JobTitlePage />
              </RequireAuth>
            }
          />
        </Route>

        {/* ================ Property Management ================ */}
        <Route path="property_management">
          <Route
            path="properties_group"
            element={
              <RequireAuth>
                <PropertiesGroupPage />
              </RequireAuth>
            }
          />

          <Route
            path="properties"
            element={
              <RequireAuth>
                <PropertyPage />
              </RequireAuth>
            }
          />

          <Route
            path="properties/:id"
            element={
              <RequireAuth>
                <DetailPropertyPage />
              </RequireAuth>
            }
          />

          <Route
            path="properties/:id/history"
            element={
              <RequireAuth>
                <HistoriesByPropertyPage />
              </RequireAuth>
            }
          />

          <Route
            path="property_providing_histories"
            element={
              <RequireAuth>
                <PropertyProvidingHistoriesPage />
              </RequireAuth>
            }
          />

          <Route
            path="property_providing_histories/:id"
            element={
              <RequireAuth>
                <DetailPropertyProvidingHistoriesPage />
              </RequireAuth>
            }
          />
        </Route>

        {/* ================ Request Management ================ */}
        <Route path="request_management">
          <Route
            path="request_properties"
            element={
              <RequireAuth>
                <RequestPropertyPage />
              </RequireAuth>
            }
          />

          <Route
            path="request_properties/:id"
            element={
              <RequireAuth>
                <DetailRequestPropertyPage />
              </RequireAuth>
            }
          />
        </Route>

        {/* ================ Leave Management ================ */}
        <Route path="leave_management">
          <Route
            path="leave"
            element={
              <RequireAuth>
                <LeavePage />
              </RequireAuth>
            }
          />
          <Route
            path="leave/:id"
            element={
              <RequireAuth>
                <DetailLeavePage />
              </RequireAuth>
            }
          />

          <Route
            path="leave_application"
            element={
              <RequireAuth>
                <LeaveApplicationPage />
              </RequireAuth>
            }
          />
          <Route
            path="leave_application/:id"
            element={
              <RequireAuth>
                <DetailLeaveApplicationPage />
              </RequireAuth>
            }
          />
        </Route>

        {/* ================ Onboarding Management ================ */}
        <Route path="onboarding_management">
          <Route
            path="onboarding_sample"
            element={
              <RequireAuth>
                <OnboardingSamplePage />
              </RequireAuth>
            }
          />
        </Route>

        {/* ================ 404 ================ */}

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
