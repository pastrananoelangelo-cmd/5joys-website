import { useState } from "react";

import Navbar from "./components/website/Navbar";
import Footer from "./components/website/Footer";

import AboutPage from "./pages/website/About";
import CareersPage from "./pages/website/Careers";
import CorporatePage from "./pages/website/Corporate";
import HomePage from "./pages/website/Home";
import LocationsPage from "./pages/website/Locations";
import VisionPage from "./pages/website/Vision";

import LoginPage from "./pages/lms/LoginPage";
import DashboardPage from "./pages/lms/DashboardPage";
import HRLeaveRequestsPage from "./pages/lms/HRLeaveRequestsPage";
import MyLeavesPage from "./pages/lms/MyLeavesPage";
import ProfilePage from "./pages/lms/ProfilePage";
import EmployeesPage from "./pages/lms/EmployeesPage";
import LeaveRecordsPage from "./pages/lms/LeaveRecordsPage";
import ReportsPage from "./pages/lms/ReportsPage";

import DashboardLayout from "./components/lms/DashboardLayout";

function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "about":
        return <AboutPage setPage={setPage} />;

      case "careers":
        return <CareersPage setPage={setPage} />;

      case "corporate":
        return <CorporatePage setPage={setPage} />;

      case "locations":
        return <LocationsPage setPage={setPage} />;

      case "vision":
        return <VisionPage setPage={setPage} />;

      case "lms-login":
        return <LoginPage setPage={setPage} />;

      case "dashboard":
        return (
          <DashboardLayout page={page} onNavigate={setPage}>
            <DashboardPage />
          </DashboardLayout>
        );

      case "hr-leave-requests":
        return (
          <DashboardLayout page={page} onNavigate={setPage}>
            <HRLeaveRequestsPage />
          </DashboardLayout>
        );
      
      case "my-leaves":
        return (
          <DashboardLayout page={page} onNavigate={setPage}>
            <MyLeavesPage />
          </DashboardLayout>
        );

      case "profile":
        return (
          <DashboardLayout page={page} onNavigate={setPage}>
            <ProfilePage />
          </DashboardLayout>
        );

      case "hr-employees":
        return (
          <DashboardLayout page={page} onNavigate={setPage}>
            <EmployeesPage />
          </DashboardLayout>
        );

      case "hr-leave-records":
        return (
          <DashboardLayout page={page} onNavigate={setPage}>
            <LeaveRecordsPage />
          </DashboardLayout>
        );

      case "hr-reports":
        return (
          <DashboardLayout page={page} onNavigate={setPage}>
            <ReportsPage />
          </DashboardLayout>
        );

      case "home":
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  const isLms = [
    "dashboard",
    "hr-leave-requests",
    "my-leaves",
    "profile",
    "hr-employees",
    "hr-leave-records",
    "hr-reports"
  ].includes(page);

  return (
    <>
      {!isLms && <Navbar setPage={setPage} />}

      {renderPage()}

      {!isLms && <Footer setPage={setPage} />}
    </>
  );
}

export default App;