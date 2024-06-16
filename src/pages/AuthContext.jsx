import React, { createContext, useState, useEffect, useNavigate } from "react";
import axios from "axios";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const nav = useNavigate();

  const login = async (formData) => {
    try {
      const response = await axios.post(
        "https://your-api-endpoint.com/login",
        formData
      );
      const token = response.data.data.token;
      const userDetailes = response.data.data.user;
      setAuth({ token, userDetailes });
      nav("./HomePageAfter");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const register = async (formData) => {
    try {
      const response = await axios.post(
        "https://your-api-endpoint.com/register",
        formData
      );
      const token = response.data.date.token;
      const userDetailes = response.data.data.user;
      setAuth({ token, userDetailes });
      nav("./VCode");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const logout = () => {
    setAuth(null);
  };

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
