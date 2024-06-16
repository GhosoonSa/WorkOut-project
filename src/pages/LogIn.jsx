import React, { useState, useContext } from "react";
import "../styling/LogIn.css";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(formData);
      navigate("/HomePageAfter"); // Redirect to home page after successful login
    } catch (error) {
      console.error("Error:", error);
      setError("Invalid email or password. Please try again.");
    }
    /*
    try {
      const response = await fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        // Successful login
        const data = await response.json();
        // Do something with the returned data, such as storing a token in local storage
        console.log('Login successful:', data);
      } else {
        // Login failed
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }*/
  };

  return (
    <>
      <section id="login">
        <div className="container-fluid col-lg-4 form-pad">
          <form className="form-group" onSubmit={handleLogin}>
            <h2 className="login-h2">Login</h2>
            {error && <p>{error}</p>}
            <div className="input-box">
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                placeholder="Enter your name:"
                aria-label="name"
                required
              />
            </div>
            <div className="input-box">
              <input
                type="email"
                className="form-control"
                onChange={handleChange}
                placeholder="Enter your email:"
                aria-label="email"
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                className="form-control"
                onChange={handleChange}
                placeholder="Enter your password:"
                aria-label="password"
                required
              />
            </div>
            <div className="login-p">
              <p>
                <a href="./ForgetPassword">forget password?</a>
              </p>
            </div>
            <div className="login-button">
              <button type="submit" className="btn">
                <a href="./HomePageAfter">Login</a>
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
export default LogIn;
