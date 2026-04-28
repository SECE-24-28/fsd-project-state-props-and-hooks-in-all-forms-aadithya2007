import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../CSS/AuthPage.css";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const firstName = (
      formData.get("firstName") || ""
    ).trim();

    const lastName = (
      formData.get("lastName") || ""
    ).trim();

    const email = (
      formData.get("email") || ""
    ).trim();

    const password = formData.get("password") || "";
    const confirmPassword =
      formData.get("confirmPassword") || "";

    if (!firstName || !lastName) {
      alert("Please enter your first name and last name.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const user = await register(
        firstName,
        lastName,
        email,
        password
      );

      alert("Registration Successful!");

      navigate(
        user.role === "admin"
          ? "/admin"
          : "/"
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className="page auth-page register-page">
      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >
        <h1>Create Your Account</h1>

        <input
          name="firstName"
          type="text"
          placeholder="First Name"
          required
        />

        <input
          name="lastName"
          type="text"
          placeholder="Last Name"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
        />

        <button type="submit">
          Register
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}

export default RegisterPage;