import { createContext, useState, useEffect, useContext } from "react";

// Create a Context object to hold authentication state globally
const AuthContext = createContext();

/**
 * AuthProvider
 * Wraps the application to handle User Sessions.
 * It manages login/logout logic and persists the user's session using LocalStorage.
 */
export const AuthProvider = ({ children }) => {
  // State to hold the current logged-in user object (null indicates no user is logged in)
  const [user, setUser] = useState(null);

  // State to handle the initial "Checking Session" phase.
  // We start as 'true' to prevent the app from rendering Protected Routes
  // until we have confirmed whether a user is already logged in or not.
  const [loading, setLoading] = useState(true);

  // --- SESSION RESTORATION (Lifecycle Hook) ---
  useEffect(() => {
    // When the app first loads, check LocalStorage for an existing session.
    const storedUser = localStorage.getItem("mq_user");

    if (storedUser) {
      // If a session exists, parse the JSON and restore the user to State.
      // This ensures the user stays logged in even if they refresh the page.
      setUser(JSON.parse(storedUser));
    }

    // Once the check is complete, we set loading to false.
    // This allows the application to finally render the appropriate routes.
    setLoading(false);
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- AUTHENTICATION ACTIONS ---

  // Function to simulate a Login
  const login = (userData) => {
    // 1. Update React State (Instant UI update)
    setUser(userData);

    // 2. Persist to LocalStorage (Long-term storage)
    // We stringify the object because LocalStorage only accepts strings.
    localStorage.setItem("mq_user", JSON.stringify(userData));
  };

  // Function to handle Logout
  const logout = () => {
    // 1. Clear React State
    setUser(null);

    // 2. Remove from LocalStorage to destroy the session
    localStorage.removeItem("mq_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {/* 
        Security Pattern:
        We conditionally render 'children' only after 'loading' is false.
        This prevents a "Flash of Unauthenticated Content," ensuring 
        Protected Routes don't redirect a valid user to Login accidentally 
        before the storage check finishes.
      */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom Hook to allow any component to easily access User Data and Auth Functions
export const useAuth = () => useContext(AuthContext);
