import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", form);

console.log("Login Success:", data);

localStorage.setItem("token", data.token);

console.log("Stored Token:", localStorage.getItem("token"));

window.location.href = "/dashboard";
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="auth-container">
  <div className="auth-card">
    <h1>Login</h1>

    <form onSubmit={submitHandler}>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />

      <button type="submit">
        Login
      </button>
    </form>

    <p>
      Don't have an account?{" "}
      <Link to="/register">
        Register
      </Link>
    </p>
  </div>
</div>);
}

export default Login;