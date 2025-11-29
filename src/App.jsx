import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddPatient from "./pages/AddPatient";
import PatientDetails from "./pages/PatientDetails";
import { AuthProvider } from "./context/AuthContext";
import { PatientProvider } from "./context/PatientContext";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/SignUp";

/**
 * App Component
 * The root component of the application.
 * It is responsible for setting up the Global Contexts and defining the Navigation Routes.
 */
function App() {
  return (
    // LAYER 1: AuthProvider
    // Wraps the entire app so 'user' state is available everywhere.
    // Must be at the top level to protect routes.
    <AuthProvider>
      {/* LAYER 2: PatientProvider
          Wraps the app so any page can access/modify the patient database. 
      */}
      <PatientProvider>
        {/* Global UI Components
            Toaster: Handles popup notifications (Success/Error).
            Navbar: The top navigation bar (renders on every page). 
        */}
        <Toaster position="top-right" />
        <Navbar />

        {/* LAYER 3: Routing Logic */}
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          {/* Accessible to anyone (Authentication pages) */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* --- PROTECTED ROUTES --- */}
          {/* These pages require the user to be logged in.
              We wrap them in <ProtectedRoute>, which checks AuthContext.
              If the user is not logged in, they are redirected to Home. 
          */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admit"
            element={
              <ProtectedRoute>
                <AddPatient />
              </ProtectedRoute>
            }
          />

          {/* DYNAMIC ROUTE:
              The ":id" segment acts as a variable parameter.
              It allows us to view details for specific patients (e.g., /patient/123).
          */}
          <Route
            path="/patient/:id"
            element={
              <ProtectedRoute>
                <PatientDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </PatientProvider>
    </AuthProvider>
  );
}

export default App;
