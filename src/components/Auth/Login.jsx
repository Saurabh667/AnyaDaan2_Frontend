import React, { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from 'axios'
import { AuthContext } from "../../AuthProvider";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {isLoggedIn,setIsLoggedIn}=useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    //   const response = await fetch("http://127.0.0.1:8000/api/login/", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(formData),
    //   });
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
  username: formData.email,
  password: formData.password
})
      console.log(response.data)
      localStorage.setItem('accessToken', response.data.access)
      localStorage.setItem('refreshToken', response.data.refresh)
      console.log('login successful')
      setIsLoggedIn(true)
      setErrors({})
      navigate('/')

    //   if (response.ok) {
    //     const data = await response.json();
    //     setMessage("✅ Login successful!");
    //     console.log("Login data:", data);
    //     setIsLoggedIn(true)
    //     navigate("/");
    //   } else {
    //     const errData = await response.json();
    //     setMessage(`❌ ${errData.detail || "Invalid credentials"}`);
    //   }
    } catch (error) {
      const backendMessage = error?.response?.data?.detail;

    if (backendMessage === "No active account found or incorrect password.") {
      // alert("No account exists. Please sign up.");
      setMessage("No account exists. Please sign up.")
    } else if (backendMessage === "Invalid credentials") {
      // alert("Incorrect email or password.");
      setMessage("Incorrect email or password.")
    } else {
      alert("Login failed. Please try again.");
      setMessage("⚠️ Network error. Please try again.");
    }
      console.error(error.response?.data || error, 'invalid credentials');
      setErrors(error.response?.data || { detail: 'Login failed' });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="form-group login-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group login-form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>

        {message && <p className="message">{message}</p>}

        <p className="signup-text">
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
