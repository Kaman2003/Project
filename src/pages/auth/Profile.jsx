import React from "react";
// import { useAuth } from "../context/AuthContext";
import { useAuth } from "../../context/AuthContext";
import "../../css/profile.css";

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          {currentUser?.name?.charAt(0).toUpperCase()}
        </div>
        <h2>{currentUser?.name}</h2>
        <p>Email: {currentUser?.email}</p>
      </div>
    </div>
  );
};

export default Profile;
