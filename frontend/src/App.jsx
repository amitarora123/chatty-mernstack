import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./components/SignupPage";
import ProfilePage from "./components/ProfilePage";
import LoginPage from "./components/LoginPage";
import SettingsPage from "./components/SettingsPage";
import HomePage from "./components/HomePage";
const App = () => {
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
};

export default App;
