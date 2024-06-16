import { Route, Routes } from "react-router-dom";
import React from "react";
import { AuthProvider, AuthContext } from "./pages/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import "./App.css";
import Navbar from "./Navbar";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import VCode from "./pages/VCode";
import ForgetPassword from "./pages/ForgetPassword";
import NewPassword from "./pages/NewPassword";
import HomePageAfter from "./pages/HomePageAfter";
import Profile from "./pages/Profile";
import Courses from "./pages/Courses";
import Trainers from "./pages/Trainers";
import Footer from "./Footer";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/VCode" element={<VCode />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/NewPassword" element={<NewPassword />} />
          <ProtectedRoute path="/HomePageAfter" element={<HomePageAfter />} />
          <ProtectedRoute path="/Profile" element={<Profile />} />
          <ProtectedRoute path="/Courses" element={<Courses />} />
          <ProtectedRoute path="/Trainers" element={<Trainers />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
