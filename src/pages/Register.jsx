import React, { useState, useContext } from "react";
import "../styling/Register.css";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    await register(formData);
  };

  return (
    <>
      <section id="register">
        <div className="container-fluid">
          <form className="form-group" onSubmit={handleSubmit}>
            <h2 className="register-h2">Make your own account:</h2>
            <div className="row">
              <div className="col-lg-4 small-form-mar">
                <div className="input-box">
                  <input
                    type="text"
                    value={formData.name}
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
                    value={formData.email}
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
                    value={formData.password}
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Enter your password:"
                    aria-label="password"
                    required
                  />
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    className="form-control"
                    onChange={handleChange}
                    placeholder="confirm your password:"
                    aria-label="confirm password"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-3 input-box big-input">
                <textarea
                  name="cv"
                  value={formData.cv}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="CV & Specialty:"
                  rows="8"
                  required
                />
              </div>
            </div>

            <div className="register-p">
              <p>
                Already have an account?
                <a href="./LogIn">Log In</a>
              </p>
            </div>

            <div className="row">
              <div className="col-lg-1 goback">
                <button type="button" className="btn">
                  <a href="/">Go back</a>
                </button>
              </div>

              <div className="col-lg-1 register-button">
                <button type="submit" className="btn">
                  <a href="./VCode">Next</a>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;
