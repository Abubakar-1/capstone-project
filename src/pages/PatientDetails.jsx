import { useParams, useNavigate } from "react-router-dom";
import { usePatients } from "../context/PatientContext";

/**
 * PatientDetails Component
 * Displays the full profile of a single patient.
 * It uses the URL parameter (e.g., /patient/123) to find the specific data
 * from the global context.
 */
function PatientDetails() {
  // --- URL PARAMETERS ---
  // The useParams hook extracts variables from the URL.
  // If the path is "/patient/55", then id will be "55".
  const { id } = useParams();

  // Access global actions (Read and Delete)
  const { getPatient, removePatient } = usePatients();

  // Hook for redirecting the user after actions
  const navigate = useNavigate();

  // --- DATA RETRIEVAL ---
  // Look up the specific patient object using the ID from the URL
  const patient = getPatient(id);

  // --- GUARD CLAUSE ---
  // If the user manually types a bad URL (e.g., /patient/99999),
  // 'patient' will be undefined. We must handle this to prevent a crash.
  if (!patient) return <div className="container">Patient not found</div>;

  // --- ACTION HANDLER ---
  const handleDischarge = () => {
    // 1. Safety Check: Browser native confirmation dialog
    if (window.confirm("Discharge this patient?")) {
      // 2. Update Context: Remove patient from the list
      removePatient(id);

      // 3. Navigation: Send user back to the main dashboard
      navigate("/dashboard");
    }
  };

  return (
    <div className="container">
      <div className="card details-card">
        {/* Header Section: Image & Name */}
        <div className="details-header">
          <img src={patient.img} alt="pt" className="avatar-large" />
          <div>
            <h1>{patient.name}</h1>
            {/* We slice the ID to make it look like a medical record number */}
            <p>ID: {patient.id.slice(0, 8)}...</p>
          </div>
        </div>

        {/* Vitals Grid: Key Statistics */}
        <div className="vitals-grid">
          <div className="vital-box">
            <span>Age</span>
            <strong>{patient.age}</strong>
          </div>
          <div className="vital-box">
            <span>Gender</span>
            <strong>{patient.gender}</strong>
          </div>
          <div className="vital-box">
            <span>Priority</span>
            {/* Dynamic Styling: Red text for Critical, Green for Stable */}
            <strong
              style={{
                color: patient.priority === "Critical" ? "red" : "green",
              }}
            >
              {patient.priority}
            </strong>
          </div>
        </div>

        {/* Clinical Info Section */}
        <div className="clinical-notes">
          <h3>Medical Notes</h3>
          <p>{patient.symptoms}</p>
          <p className="timestamp">Admitted at: {patient.admittedAt}</p>
        </div>

        {/* Destructive Action Button */}
        <button onClick={handleDischarge} className="btn-danger">
          Discharge Patient
        </button>
      </div>
    </div>
  );
}

export default PatientDetails;
