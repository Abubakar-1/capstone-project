import { createContext, useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid"; // Library to generate unique IDs
import { toast } from "react-hot-toast"; // Library for notification popups

// Create the Context object to hold global state
const PatientContext = createContext();

/**
 * PatientProvider
 * Wraps the application to provide access to patient data and actions
 * throughout the component tree.
 */
export const PatientProvider = ({ children }) => {
  // --- STATE MANAGEMENT & INITIALIZATION ---

  // We use "Lazy Initialization" for the useState hook.
  // Instead of passing [], we pass a function that runs exactly once when the app loads.
  // This checks LocalStorage immediately, ensuring we don't accidentally
  // overwrite existing data with an empty array on page refresh.
  const [patients, setPatients] = useState(() => {
    const storedPatients = localStorage.getItem("mq_patients");
    return storedPatients ? JSON.parse(storedPatients) : [];
  });

  // --- ASYNCHRONOUS API FETCHING (Bonus Feature) ---

  useEffect(() => {
    const storedPatients = localStorage.getItem("mq_patients");

    // Only fetch external API data if the local database is completely empty.
    // This simulates a "First Time Setup" for new users.
    if (!storedPatients) {
      console.log("No local data found. Fetching from RandomUser API...");

      fetch("https://randomuser.me/api/?results=5&nat=us")
        .then((res) => res.json())
        .then((data) => {
          // Data Transformation:
          // The API returns raw user data. We map this to match our
          // application's specific Patient Schema (adding Priority, Symptoms, etc).
          const formatted = data.results.map((u) => ({
            id: u.login.uuid,
            name: `${u.name.first} ${u.name.last}`,
            age: u.dob.age,
            gender: u.gender,
            // Randomly assign triage status for demonstration purposes
            priority: Math.random() > 0.7 ? "Critical" : "Stable",
            symptoms: "Initial checkup required",
            admittedAt: new Date().toLocaleString(),
            img: u.picture.large,
          }));

          // Update State with the new mock data
          setPatients(formatted);
        })
        .catch((err) => console.error("Failed to fetch mock data:", err));
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- PERSISTENCE (LocalStorage) ---

  // This effect runs every time the 'patients' array changes (Add/Remove).
  // It syncs the React State with the Browser's LocalStorage.
  useEffect(() => {
    localStorage.setItem("mq_patients", JSON.stringify(patients));
  }, [patients]);

  // --- ACTIONS (CRUD Operations) ---

  // Function to add a new patient (Create)
  const addPatient = (patient) => {
    const newPatient = {
      ...patient,
      id: uuidv4(), // Generate a secure unique ID
      admittedAt: new Date().toLocaleString(), // Timestamp
    };
    // Add new patient to the BEGINNING of the array (Newest first)
    setPatients([newPatient, ...patients]);

    // Trigger UX Notification
    toast.success("Patient Admitted Successfully!");
  };

  // Function to remove a patient (Delete)
  const removePatient = (id) => {
    // Filter out the patient with the matching ID
    setPatients(patients.filter((p) => p.id !== id));
    toast.error("Patient Discharged.");
  };

  // Function to find a specific patient (Read)
  const getPatient = (id) => patients.find((p) => p.id === id);

  // Return the Provider with values exposed to the app
  return (
    <PatientContext.Provider
      value={{ patients, addPatient, removePatient, getPatient }}
    >
      {children}
    </PatientContext.Provider>
  );
};

// Custom Hook to consume the context easily in other components
export const usePatients = () => useContext(PatientContext);
