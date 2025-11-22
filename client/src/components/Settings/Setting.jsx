import React, { useState, useContext, useEffect } from 'react';
import { SUPPORTED_LANGUAGE } from '../../utils/constants';
import {useDispatch, useSelector} from "react-redux"
import lang from '../../utils/langaugeConstant';
import { changeLanguage } from '../../utils/configSlice';
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';
import { ButtonLoader } from '../Loader/Loader';

const Settings = () => {
  const { user, setUser, getUser } = useContext(UserContext);
  const langKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);

  const [settings, setSettings] = useState({
    theme: user?.settings?.theme || 'light',
    language: user?.settings?.language || langKey,
    notifications: user?.settings?.notifications !== undefined ? user.settings.notifications : true,
    privacy: user?.settings?.privacy || 'Public',
  });

  useEffect(() => {
    if (user?.settings) {
      setSettings({
        theme: user.settings.theme || 'light',
        language: user.settings.language || langKey,
        notifications: user.settings.notifications !== undefined ? user.settings.notifications : true,
        privacy: user.settings.privacy || 'Public',
      });
    }
  }, [user, langKey]);

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    dispatch(changeLanguage(newLanguage));
    setSettings(prev => ({
      ...prev,
      language: newLanguage
    }));
  };

  const handleSaveSettings = async () => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/user/settings`,
        settings,
        config
      );

      toast.success("Settings saved successfully!", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });

      // Update user context
      if (response.data.user) {
        setUser(response.data.user);
        await getUser();
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      const errorMessage = error.response?.data?.message || "Failed to save settings. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleToggleChange = (event) => {
    const { name, checked } = event.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: checked,
    }));
  };

  // Add more handler functions as needed

  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    paddingBottom: '60px', // Adjust this value so the content doesn't overlap with the footer
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: settings.theme === 'light' ? '#f9f9f9' : '#333',
    color: settings.theme === 'light' ? '#333' : '#f9f9f9',
    marginBottom: '100px', // This should be at least as tall as your footer to prevent overlap
  };

  const titleStyle = {
    textAlign: 'center',
  };

  const itemStyle = {
    marginBottom: '20px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  };

  const selectStyle = {
    ...inputStyle,
  };

  const checkboxStyle = {
    marginRight: '10px',
  };

  // Add more styles as needed


  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-indigo-50 min-h-screen py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">{lang[langKey].setting}</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="card p-8">
          <form className="space-y-8">
            {/* Theme Selector */}
            <div className="space-y-3">
              <label htmlFor="theme" className="label flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                {lang[langKey].theme}
              </label>
              <select name="theme" id="theme" value={settings.theme} onChange={handleInputChange} className="input-field">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            {/* Language */}
            <div className="space-y-3">
              <label htmlFor="language" className="label flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                {lang[langKey].Language}
              </label>
              <select name="language" id="language" value={settings.language} onChange={handleLanguageChange} className="input-field">
                {SUPPORTED_LANGUAGE.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
                ))}
              </select>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label htmlFor="notifications" className="label mb-0 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {lang[langKey].Notifications}
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="notifications"
                  id="notifications"
                  checked={settings.notifications}
                  onChange={handleToggleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {/* Privacy */}
            <div className="space-y-3">
              <label htmlFor="privacy" className="label flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                {lang[langKey].ProfilePrivacy}
              </label>
              <select name="privacy" id="privacy" value={settings.privacy} onChange={handleInputChange} className="input-field">
                <option value="Public">{lang[langKey].Public}</option>
                <option value="Private">{lang[langKey].Private}</option>
              </select>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button 
                type="button" 
                onClick={handleSaveSettings}
                className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <ButtonLoader size="small" />
                    <span>Saving...</span>
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;
