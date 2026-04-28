import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../CSS/AuthPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email").trim();
    const password = formData.get("password");

    try {
      const user = await login(email, password);
      alert("Login Successful!");
      navigate(user.role === "admin" ? "/admin" : "/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className="page auth-page login-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Login To Your Account</h1>
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p>
          New User? <Link to="/register">Register</Link>
        </p>
        <Link to="/forgot-password">Forgot Password?</Link>
      </form>
    </main>
  );
}

export default LoginPage;
