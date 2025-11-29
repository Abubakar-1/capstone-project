import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

// --- VALIDATION SCHEMA ---
// Rules for creating a new account.
// We require a 'name' field here (unlike Login) because we are creating a new profile.
const schema = yup
  .object({
    name: yup.string().required("Name is required"), // Essential for personalization
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(4, "Password must be at least 4 chars")
      .required(),
  })
  .required();

/**
 * Signup Component
 * Handles the registration of new staff members.
 * It validates inputs and creates a new session immediately upon success.
 */
function Signup() {
  // Access the login action to instantly authenticate the user after signing up
  const { login } = useAuth();

  // Hook to redirect to Dashboard after success
  const navigate = useNavigate();

  // Initialize form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // --- SUBMISSION HANDLER ---
  const onSubmit = (data) => {
    // 1. Simulate Backend Registration
    // In a real application, you would send a POST request to an API endpoint
    // (e.g., /api/register) to save this user in a database.

    // 2. Client-Side Login
    // Since this is a demo, we treat the signup data as the "User Profile"
    // and log them in immediately using the context.
    login(data);

    // 3. Redirect
    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <div className="card">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Input (Specific to Signup) */}
          <div className="form-group">
            <label>Full Name</label>
            <input {...register("name")} placeholder="Jane Doe" />
            <p className="error">{errors.name?.message}</p>
          </div>

          {/* Email Input */}
          <div className="form-group">
            <label>Email</label>
            <input {...register("email")} placeholder="jane@clinic.com" />
            <p className="error">{errors.email?.message}</p>
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label>Password</label>
            <input type="password" {...register("password")} />
            <p className="error">{errors.password?.message}</p>
          </div>

          <button type="submit" className="btn-primary">
            Sign Up
          </button>
        </form>

        {/* Navigation back to Login if user already exists */}
        <p className="switch-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
