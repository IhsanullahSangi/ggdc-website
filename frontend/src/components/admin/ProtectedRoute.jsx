import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { MonitorOff } from "lucide-react";

const ProtectedRoute = () => {
  // 1024px is standard for Desktop/Laptop screens
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  // Check if the admin token exists in browser storage
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // If no token exists, bounce them to the public home page
  if (!adminToken) {
    return <Navigate to="/" replace />;
  }

  // If they are logged in but using a mobile device, show the lock screen
  if (!isDesktop) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center font-body">
        <MonitorOff size={64} className="text-red-500 mb-6 animate-pulse" />
        <h2 className="text-2xl font-heading font-bold text-white mb-3">
          Desktop Access Required
        </h2>
        <p className="text-gray-400 max-w-md leading-relaxed">
          Administrative functions and database modifications are strictly
          restricted to Desktop workstations for layout integrity and security.
          Please log in from a computer.
        </p>
      </div>
    );
  }

  // If logged in AND on desktop, render the Admin layout
  return <Outlet />;
};

export default ProtectedRoute;
