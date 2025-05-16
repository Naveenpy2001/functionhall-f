import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-illustration">
        {/* SVG: Conference / Event themed illustration */}
        <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="300" r="200" fill="#f0f4ff" />
          <rect x="300" y="250" width="200" height="120" rx="20" fill="#007bff" />
          <circle cx="350" cy="310" r="10" fill="white" />
          <circle cx="400" cy="310" r="10" fill="white" />
          <circle cx="450" cy="310" r="10" fill="white" />
          <text x="400" y="400" textAnchor="middle" fontSize="40" fill="#333">404</text>
        </svg>
      </div>

      <h1 className="notfound-title">Page Not Found</h1>
      <p className="notfound-message">We're getting the stage ready! Please check back soon.</p>
      <Link to="/" className="home-button">← Back to Home</Link>
    </div>
  );
};

export default NotFound;
