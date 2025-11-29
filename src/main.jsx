import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Global styles that apply to the entire app
import App from "./App.jsx"; // The root component of the application
import { BrowserRouter } from "react-router-dom"; // The History API wrapper that enables navigation

/**
 * Application Entry Point
 * This file is the bridge between standard HTML and the React Application.
 * It finds the <div id="root"> in index.html and injects the React app into it.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 
      BrowserRouter:
      We wrap the entire <App /> in this provider.
      This gives every component inside the app access to the URL, navigation history,
      and routing features (like Link and Routes). Without this, routing won't work.
    */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
