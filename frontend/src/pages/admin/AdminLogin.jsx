import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Pointing to the backend route you already built
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the JWT token and route to the hidden dashboard
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server connection failed. Please contact IT.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-body">
      <div className="bg-slate-800 p-8 md:p-10 rounded-lg shadow-2xl w-full max-w-md border-t-4 border-collegeCyan">
        <div className="flex justify-center mb-6">
          <div className="bg-slate-700 p-4 rounded-full text-collegeCyan">
            <Lock size={32} />
          </div>
        </div>

        <h1 className="text-2xl font-heading font-bold text-white text-center mb-8 uppercase tracking-widest">
          IT Admin Portal
        </h1>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Administrator Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 text-white border border-slate-600 rounded focus:outline-none focus:border-collegeCyan transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 text-white border border-slate-600 rounded focus:outline-none focus:border-collegeCyan transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-collegeCyan text-white font-bold py-3 rounded hover:bg-cyan-600 transition-colors mt-4 disabled:opacity-50"
          >
            {isLoading ? "Authenticating..." : "Secure Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
