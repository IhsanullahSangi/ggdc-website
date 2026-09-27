import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

// --- Public Components ---
import Header from "./components/Header";
import NotificationPopup from "./components/NotificationPopup";
import Footer from "./components/Footer";
import AdmissionAlert from "./components/AdmissionAlert";

// --- Public Pages ---
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import EnrollmentStats from "./components/EnrollmentStats";
import ProgramsSection from "./components/ProgramsSection";
import GallerySection from "./components/GallerySection";
import VisionMission from "./pages/VisionMission";
import AffiliationGovernance from "./pages/AffiliationGovernance";
import FeeStructure from "./pages/FeeStructure";
import Curriculum from "./pages/Curriculum";
import StaffMembers from "./pages/StaffMembers";
import NewsEvents from "./pages/NewsEvents";
import Downloads from "./pages/Downloads";
import ContactUs from "./pages/ContactUs";
import OnlineApply from "./pages/OnlineApply";
import AdmitCard from "./pages/AdmitCard";
import Results from "./pages/Results";

// 1. Define the layout for the public facing website
const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <NotificationPopup />
      <div className="flex-grow">
        <Outlet /> {/* This injects whatever public page the user is on */}
      </div>
      <AdmissionAlert />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES - Wrapped in PublicLayout */}
        <Route element={<PublicLayout />}>
          <Route
            path="/"
            element={
              <main>
                <Hero />
                <AboutSection />
                <EnrollmentStats />
                <ProgramsSection />
                <GallerySection />
              </main>
            }
          />

          <Route path="/vision-mission" element={<VisionMission />} />
          <Route
            path="/affiliation-governance"
            element={<AffiliationGovernance />}
          />
          <Route path="/fee-structure" element={<FeeStructure />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/faculty" element={<StaffMembers />} />
          <Route path="/news-events" element={<NewsEvents />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/contact" element={<ContactUs />} />

          <Route path="/admissions/online-apply" element={<OnlineApply />} />
          <Route path="/admissions/admit-card" element={<AdmitCard />} />
          <Route path="/admissions/results" element={<Results />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
