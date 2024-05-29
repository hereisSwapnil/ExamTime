import React from "react";
import { Link } from "react-router-dom";
import lang from "../../utils/langaugeConstant";
import { useSelector } from "react-redux";

const Footer = () => {

  const langKey=useSelector((store)=>store.config.lang)

  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="/">
            <img
              className="h-auto w-[150px]"
              src="https://i.postimg.cc/m2qJB5J2/logo-1.png"
              alt="Exam Time"
            />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>

              <Link to="/about" className="hover:underline me-4 md:me-6">
                About
              </Link>

              <a href="/about" className="hover:underline me-4 md:me-6">
                {lang[langKey].About}
              </a>

            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="hover:underline me-4 md:me-6"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/licensing" className="hover:underline me-4 md:me-6">
                Licensing
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
                {lang[langKey].PrivacyPolicy}
            </li>
            <li>
              <a href="/licensing" className="hover:underline me-4 md:me-6">
                {lang[langKey].Licensing}
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                {lang[langKey].Contact}
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}
          <Link to="/" className="hover:underline">
            ExamTime
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
