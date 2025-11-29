import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute Component
 * This is a "Wrapper Component" acting as a security guard.
 * It checks if a user is authenticated before allowing them to view specific pages.
 *
 * Usage:
 * <ProtectedRoute>
 *    <Dashboard />
 * </ProtectedRoute>
 */
function ProtectedRoute({ children }) {
  // Access the current user state from our global AuthContext
  const { user } = useAuth();

  // --- SECURITY CHECK ---
  // If no user is logged in (user is null), we immediately block access.
  if (!user) {
    // The <Navigate /> component effectively performs a redirect.
    // We send the unauthorized user back to the Login page ("/")
    return <Navigate to="/" />;
  }

  // --- ACCESS GRANTED ---
  // If the user exists, we render the "children" (the component inside this wrapper).
  // Example: If wrapping Dashboard, this renders the Dashboard.
  return children;
}

export default ProtectedRoute;
