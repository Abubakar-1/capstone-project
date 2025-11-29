import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

// --- VALIDATION SCHEMA ---
// Defines the rules for a valid login attempt.
// Yup ensures the email format is correct and the password meets security requirements.
const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(4, "Password too short").required(),
  })
  .required();

/**
 * Login Component
 * The entry point for the application.
 * Handles user authentication via a mock login process.
 */
function Login() {
  // Access the login function from our Global AuthContext
  const { login } = useAuth();

  // Hook to redirect the user after a successful login
  const navigate = useNavigate();

  // Initialize React Hook Form with Yup validation
  const {
    register, // Function to bind input fields to the form state
    handleSubmit, // Wrapper that handles validation before submission
    formState: { errors }, // Object containing any validation errors
  } = useForm({
    resolver: yupResolver(schema),
  });

  // --- SUBMISSION HANDLER ---
  // This runs only if the form inputs are valid.
  const onSubmit = (data) => {
    // 1. Simulate Authentication
    // In a real app, you would send a POST request to a backend here.
    // For this capstone, we update the global user state with mock data.
    login({ name: "Admin Staff", email: data.email });

    // 2. Redirect
    // Move the user to the private Dashboard
    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <div className="card">
        <h2>Staff Login</h2>

        {/* Form Submission */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="form-group">
            <label>Email Address</label>
            {/* The ...register syntax injects 'onChange', 'onBlur', and 'name' props */}
            <input {...register("email")} placeholder="admin@clinic.com" />
            {/* Display validation error if it exists */}
            <p className="error">{errors.email?.message}</p>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label>Password</label>
            <input type="password" {...register("password")} />
            <p className="error">{errors.password?.message}</p>
          </div>

          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>

        {/* Toggle between Login and Signup */}
        <p className="switch-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
