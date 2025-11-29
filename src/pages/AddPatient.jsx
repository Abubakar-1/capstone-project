import { useForm } from "react-hook-form"; // Library for managing complex forms efficiently
import { yupResolver } from "@hookform/resolvers/yup"; // Connector between Hook Form and Yup
import * as yup from "yup"; // Library for defining validation schemas
import { usePatients } from "../context/PatientContext";
import { useNavigate } from "react-router-dom";

// --- VALIDATION SCHEMA ---
// We define the rules for our data outside the component.
// This ensures data integrity before it ever reaches our state or API.
const schema = yup
  .object({
    name: yup.string().required("Patient name is required"), // Must not be empty
    age: yup.number().positive().integer().required(), // Must be > 0 and a whole number
    gender: yup.string().required(),
    symptoms: yup.string().min(5, "Describe symptoms clearly").required(), // Enforce minimum detail
    priority: yup.string().required(),
  })
  .required();

function AddPatient() {
  // Consume global state actions
  const { addPatient } = usePatients();

  // Hook for programmatic navigation (redirecting after submit)
  const navigate = useNavigate();

  // --- FORM CONFIGURATION ---
  // register: Function to link inputs to the form state
  // handleSubmit: Function that handles validation before running our custom logic
  // errors: Object containing validation error messages to display to the user
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // Apply the Yup validation rules defined above
  });

  // --- SUBMISSION HANDLER ---
  // This only runs IF validation passes (handled automatically by handleSubmit)
  const onSubmit = (data) => {
    // 1. Prepare Data
    // We append a default avatar image since this form doesn't handle file uploads yet
    const finalData = {
      ...data,
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    };

    // 2. Update Global Context
    addPatient(finalData);

    // 3. Redirect User
    // Send them back to the dashboard to see the new entry
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <div className="card form-container">
        <h2>🏥 Admit New Patient</h2>

        {/* The handleSubmit wrapper ensures validation runs when the button is clicked */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="form-group">
            <label>Full Name</label>
            {/* ...register connects this input to React Hook Form */}
            <input {...register("name")} />
            {/* Conditional Rendering: Show error message if validation fails */}
            <p className="error">{errors.name?.message}</p>
          </div>

          <div className="row">
            {/* Age Field */}
            <div className="form-group">
              <label>Age</label>
              <input type="number" {...register("age")} />
              <p className="error">{errors.age?.message}</p>
            </div>

            {/* Gender Field */}
            <div className="form-group">
              <label>Gender</label>
              <select {...register("gender")}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Symptoms Field */}
          <div className="form-group">
            <label>Symptoms / Chief Complaint</label>
            <textarea {...register("symptoms")} rows="3"></textarea>
            <p className="error">{errors.symptoms?.message}</p>
          </div>

          {/* Priority Field */}
          <div className="form-group">
            <label>Triage Priority</label>
            <select {...register("priority")}>
              <option value="Stable">Stable</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <button type="submit" className="btn-primary">
            Admit Patient
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPatient;
