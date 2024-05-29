import React, { useState } from "react";
import { SUPPORTED_LANGUAGE } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import lang from "../../utils/langaugeConstant";
import { changeLanguage } from "../../utils/configSlice";
import { useTheme } from "../../Context/ThemeContext";

const Settings = () => {
  const langKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();
  const {toggleTheme} = useTheme();

  const [settings, setSettings] = useState({
    theme: "light",
    email: "",
    password: "",
    notifications: true,
    privacy: "Public",
    accessibility: "Default",
    security: "Standard",
  });

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const handleThemeChange = (e) => {
    toggleTheme();
    const { name, value } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  }

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

  return (
    <div className="dark:bg-gray-900 p-10">
    <div className="max-w-2xl mx-auto p-20 border-1 border-gray-300 rounded-lg bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 mb-100">
      <h1 className="text-center">{lang[langKey].setting}</h1>
      <form>
        {/* Theme Selector */}
        <div className="mb-4">
          <label htmlFor="theme" className="block mb-1">
            {lang[langKey].theme}:
          </label>
          <select
            name="theme"
            id="theme"
            value={settings.theme}
            onChange={handleThemeChange}
            className="w-full p-2 border border-gray-300 rounded-md dark:text-gray-100 dark:bg-gray-700"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Email Address */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            {lang[langKey].EmailAddress}:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={settings.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md dark:text-gray-100 dark:bg-gray-700"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            {lang[langKey].Password}:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={settings.password}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md dark:text-gray-100 dark:bg-gray-700"
          />
        </div>

        {/* Language */}
        <div className="mb-4">
          <label htmlFor="language" className="block mb-1">
            {lang[langKey].Language}:
          </label>
          <select
            name="language"
            id="language"
            value={settings.language}
            onChange={handleLanguageChange}
            className="w-full p-2 border border-gray-300 rounded-md dark:text-gray-100 dark:bg-gray-700"
          >
            {SUPPORTED_LANGUAGE.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Notifications */}
        <div className="mb-4">
          <label htmlFor="notifications" className="block mb-1">
            {lang[langKey].Notifications}:
          </label>
          <input
            type="checkbox"
            name="notifications"
            id="notifications"
            checked={settings.notifications}
            onChange={handleToggleChange}
            className="mr-2 dark:text-gray-100"
          />
        </div>

        {/* Privacy */}
        <div className="mb-4">
          <label htmlFor="privacy" className="block mb-1">
            {lang[langKey].ProfilePrivacy}:
          </label>
          <select
            name="privacy"
            id="privacy"
            value={settings.privacy}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md dark:text-gray-100 dark:bg-gray-700"
          >
            <option value="Public">{lang[langKey].Public}</option>
            <option value="Private">{lang[langKey].Private}</option>
          </select>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Settings;
