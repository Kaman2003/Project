import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTint,
  faChartLine,
  faMicrochip,
  faSignOutAlt,
  faUser,
  faBars,
  faTimes,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import "../layout.css";

function AuthenticatedNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);

  const isActive = (path) => location.pathname === path;

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleLogout = async () => {
    toggleMenu();
    await logout();
    navigate("/");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (

    <nav className="navbar authenticated">
      <div className="navbar-container">
        <Link to="/app" className="navbar-logo" onClick={() => setIsMenuOpen(false)}>
          <div className="logo-animation">
            <div className="drop"></div>
            <div className="wave"></div>
          </div>
          <span>H2Flow Dashboard</span>
        </Link>

        <div className="navbar-user-section">
          <div className="navbar-avatar" onClick={() => setIsProfileModalOpen(true)}>
            <span>{currentUser?.name?.charAt(0).toUpperCase()}</span>
          </div>
          {isUserMenuOpen && (
            <ul className="user-dropdown">
              <li>
                <Link to="/app/profile" onClick={() => setIsUserMenuOpen(false)}>
                  <FontAwesomeIcon icon={faUserCircle} /> Profile
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
              </li>
            </ul>
          )}
        </div>
        {isProfileModalOpen && (
          <div className="modal-overlay">
            <div className="modal profile-modal">
              <button className="modal-close" onClick={() => setIsProfileModalOpen(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <div className="modal-content">
                <div className="profile-avatar-large">
                  {currentUser?.name?.charAt(0).toUpperCase()}
                </div>
                <h2>{currentUser?.name}</h2>
                <p>{currentUser?.email}</p>
              </div>
            </div>
          </div>
        )}

        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <button className="navbar-toggle-close" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <ul className="navbar-links">
            <li>
              <Link
                to="/app"
                className={isActive("/app") ? "active" : ""}
                onClick={toggleMenu}
              >
                <FontAwesomeIcon icon={faChartLine} /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/app/water-quality"
                className={isActive("/app/water-quality") ? "active" : ""}
                onClick={toggleMenu}
              >
                <FontAwesomeIcon icon={faTint} /> Water Quality
              </Link>
            </li>
            <li>
              <Link
                to="/app/sensor-readings"
                className={isActive("/app/sensor-readings") ? "active" : ""}
                onClick={toggleMenu}
              >
                <FontAwesomeIcon icon={faMicrochip} /> Sensor Readings
              </Link>
            </li>
            <li className="user-menu">
              <button
                onClick={logout}
                className="logout-button navbar-auth-button"
              >
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </button>
            </li>
          </ul>
        </div>

        <button className="navbar-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </nav>
  );
}

export default AuthenticatedNavbar;
