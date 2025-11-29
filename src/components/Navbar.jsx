import { Link } from "react-router-dom"; // Link component avoids full page reloads (SPA behavior)
import { useAuth } from "../context/AuthContext";
import { FaHospitalSymbol, FaUserNurse, FaSignOutAlt } from "react-icons/fa"; // Import icons for UI polish

/**
 * Navbar Component
 * The main navigation header that persists across all pages.
 * It dynamically adjusts its content based on the user's login status.
 */
function Navbar() {
  // Consume the AuthContext to check if a user is currently logged in
  // and access the logout function.
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      {/* Branding / Logo Area */}
      <div className="logo">
        <FaHospitalSymbol className="icon" /> MediQueue Pro
      </div>

      {/* 
         CONDITIONAL RENDERING:
         We use the logical AND operator (&&) to render the navigation links 
         ONLY if 'user' is truthy (i.e., someone is logged in).
         If user is null, this entire block is skipped.
      */}
      {user && (
        <div className="nav-links">
          {/* Navigation Links using React Router */}
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/admit">Admit Patient</Link>

          {/* Logout Button */}
          {/* Calls the logout function from Context to clear the session */}
          <button onClick={logout} className="btn-logout">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
