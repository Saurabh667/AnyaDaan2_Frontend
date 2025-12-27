import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const [errors,setErrors]=useState({})

  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)

    try {
      const response=await axios.post("http://127.0.0.1:8000/api/signup/", formData);
      console.log(response.data)
      setErrors({})
      await fetch("http://127.0.0.1:8000/api/sendEmail/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      console.log('data send to backend')
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      // console.error("Signup error:", error);
      console.error("Signup error:", error.response.data);
      setErrors(error.response.data);
      alert("Signup failed!");
    }
  };

  return (
    <div className="page">
      <div className="Scard">
        <h1 className="title">Anyadaan Signup</h1>

        <form onSubmit={handleSubmit} className="signupForm">
          {/* Company */}
          <div className="field">
            <label>Company / Organization Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Are you a donor or receiver?</label>
            <div className="role">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="donor"
                  checked={formData.role === "donor"}
                  onChange={handleChange}
                />
                Donor
              </label>

              <label>
                <input
                  type="radio"
                  name="role"
                  value="receiver"
                  checked={formData.role === "receiver"}
                  onChange={handleChange}
                />
                Receiver
              </label>
            </div>
            <small>{errors.role && <div> Please select a role</div>}</small>
          </div>

          <div className="row">
            <div className="field">
              <label>First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <small>{errors.email && <div>Email id already exist</div>}</small>
          </div>


          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn">
            Create Account
          </button>

          <p className="login-text">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
