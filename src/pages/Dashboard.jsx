import { useState } from "react";
import { usePatients } from "../context/PatientContext";
import { Link } from "react-router-dom";
import { FaSearch, FaFilter } from "react-icons/fa";

/**
 * Dashboard Component
 * The central hub of the application.
 * Displays real-time statistics, search controls, and a list of all patients.
 */
function Dashboard() {
  // Access global patient data from Context
  const { patients } = usePatients();

  // --- LOCAL UI STATE ---
  // We use local state for search/filter because it only affects THIS view.
  // It doesn't need to be global.
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // --- FILTERING LOGIC (Derived State) ---
  // Instead of creating a new state for "filtered results," we calculate it
  // on every render. This ensures the list is always in sync with the real data.
  const filteredPatients = patients.filter((patient) => {
    // 1. Name Match: Check if name includes search text (Case Insensitive)
    const matchesSearch = patient.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // 2. Status Match: Check if priority matches dropdown OR if "All" is selected
    const matchesFilter =
      filterStatus === "All" || patient.priority === filterStatus;

    // Return true only if BOTH conditions are met
    return matchesSearch && matchesFilter;
  });

  // --- STATISTICS CALCULATION ---
  // We calculate stats from the 'patients' (full list), not 'filteredPatients'.
  // This ensures the top cards always show the total hospital capacity.
  const criticalCount = patients.filter(
    (p) => p.priority === "Critical"
  ).length;
  const stableCount = patients.filter((p) => p.priority === "Stable").length;

  return (
    <div className="container">
      {/* --- STATS ROW (Heads-up Display) --- */}
      <div className="stats-row">
        <div className="stat-card">
          <h3>Total Patients</h3>
          <p className="stat-num">{patients.length}</p>
        </div>
        <div className="stat-card danger">
          <h3>Critical Cases</h3>
          <p className="stat-num">{criticalCount}</p>
        </div>
        <div className="stat-card success">
          <h3>Stable Cases</h3>
          <p className="stat-num">{stableCount}</p>
        </div>
      </div>

      {/* --- ACTION HEADER --- */}
      <div className="header-row">
        <h2>Waitlist Overview</h2>
        {/* Navigate to the Admit Form */}
        <Link to="/admit" className="btn-primary">
          Admit New Patient
        </Link>
      </div>

      {/* --- SEARCH & FILTER CONTROLS --- */}
      <div
        className="search-bar-container"
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* Search Input Box */}
        <div style={{ position: "relative", flex: 1 }}>
          <FaSearch
            style={{
              position: "absolute",
              top: "12px",
              left: "10px",
              color: "#aaa",
            }}
          />
          <input
            type="text"
            placeholder="Search patients by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update local state
            style={{ paddingLeft: "35px" }} // Make room for the icon
          />
        </div>

        {/* Filter Dropdown */}
        <div style={{ position: "relative", minWidth: "150px" }}>
          <FaFilter
            style={{
              position: "absolute",
              top: "12px",
              left: "10px",
              color: "#aaa",
            }}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ paddingLeft: "35px" }}
          >
            <option value="All">All Statuses</option>
            <option value="Critical">Critical Only</option>
            <option value="Stable">Stable Only</option>
          </select>
        </div>
      </div>

      {/* --- PATIENT GRID --- */}
      <div className="grid">
        {/* Conditional Rendering: Empty State vs Data */}
        {filteredPatients.length === 0 ? (
          <div
            style={{
              gridColumn: "1 / -1", // Span full width
              textAlign: "center",
              padding: "2rem",
              color: "#888",
            }}
          >
            <p>No patients found matching your search.</p>
          </div>
        ) : (
          // Map through results and generate cards
          filteredPatients.map((p) => (
            <div
              key={p.id}
              // Dynamic Class Name based on priority (adds red/green border)
              className={`patient-card ${p.priority.toLowerCase()}`}
            >
              <div className="card-header">
                {/* Fallback image if user has no avatar */}
                <img
                  src={p.img || "https://via.placeholder.com/100"}
                  alt="pt"
                  className="avatar"
                />
                <div>
                  <h4>{p.name}</h4>
                  {/* Badge Styling */}
                  <span
                    className={`badge ${
                      p.priority === "Critical" ? "badge-red" : "badge-green"
                    }`}
                  >
                    {p.priority}
                  </span>
                </div>
              </div>
              <p>
                <strong>Symptoms:</strong> {p.symptoms}
              </p>
              <Link to={`/patient/${p.id}`} className="btn-outline">
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
