import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: "light",
    email: "",
    password: "",
    language: "English",
    notifications: true,
    privacy: "Public",
    accessibility: "Default",
    security: "Standard",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleToggleChange = (event) => {
    const { name, checked } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: checked,
    }));
  };

  // Add more handler functions as needed

  const containerStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    paddingBottom: "60px", // Adjust this value so the content doesn't overlap with the footer
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: settings.theme === "light" ? "#f9f9f9" : "#333",
    color: settings.theme === "#333",
    marginBottom: "100px", // This should be at least as tall as your footer to prevent overlap
  };

  const titleStyle = {
    textAlign: "center",
    color: settings.theme === "light" ? "#333" : "#f9f9f9",
  };

  const itemStyle = {
    marginBottom: "20px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    color: settings.theme === "light" ? "#333" : "#f9f9f9",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  };

  const selectStyle = {
    ...inputStyle,
  };

  const checkboxStyle = {
    marginRight: "10px",
  };

  // Add more styles as needed

  return (
    <div>
      <Navbar />
      <div
        className={`settings-container ${settings.theme}-theme`}
        style={containerStyle}
      >
        <h1 style={titleStyle}>Settings</h1>
        <form>
          {/* Theme Selector */}
          <div className="setting-item" style={itemStyle}>
            <label htmlFor="theme" style={labelStyle}>
              Theme:
            </label>
            <select
              name="theme"
              id="theme"
              value={settings.theme}
              onChange={handleInputChange}
              style={selectStyle}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          {/* Email Address */}
          <div className="setting-item" style={itemStyle}>
            <label htmlFor="email" style={labelStyle}>
              Email Address:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={settings.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Password */}
          <div className="setting-item" style={itemStyle}>
            <label htmlFor="password" style={labelStyle}>
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={settings.password}
              onChange={handleInputChange}
            />
          </div>

          {/* Language */}
          <div className="setting-item" style={itemStyle}>
            <label htmlFor="language" style={labelStyle}>
              Language:
            </label>
            <select
              name="language"
              id="language"
              value={settings.language}
              onChange={handleInputChange}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              {/* Add more languages */}
            </select>
          </div>

          {/* Notifications */}
          <div className="setting-item">
            <label htmlFor="notifications" style={labelStyle}>
              Notifications:
            </label>
            <input
              type="checkbox"
              name="notifications"
              id="notifications"
              checked={settings.notifications}
              onChange={handleToggleChange}
            />
          </div>

          {/* Privacy */}
          <div className="setting-item">
            <label htmlFor="privacy" style={labelStyle}>
              Profile Privacy:
            </label>
            <select
              name="privacy"
              id="privacy"
              value={settings.privacy}
              onChange={handleInputChange}
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          {/* Accessibility */}
          {/* <div className="setting-item">
          <label htmlFor="accessibility">Accessibility:</label>
          <select name="accessibility" id="accessibility" value={settings.accessibility} onChange={handleInputChange}>
          </select>
        </div> */}
        </form>
      </div>
    </div>
  );
};

export default Settings;
