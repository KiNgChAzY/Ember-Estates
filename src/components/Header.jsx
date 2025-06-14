import "../css/header.css";
import Navigation from "./Navigation";
import { useState } from "react";

const Header = () => {
  const [MenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!MenuOpen);
  };

  return (
    <header>
      <div className="top-bar">
        <img
          src={`${process.env.PUBLIC_URL}/images/ember.jpg`}
          className="logo-img"
          alt="Ember Estates Logo"
        />
        <div className="site-title">
          <span>Ember Estates</span>
        </div>
        <button className="nav-toggle" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </button>
        <div className="profile">
          <span className="profile-icon">
            <img src={`${process.env.PUBLIC_URL}/images/profile.jpg`} alt="Profile Picture" />
          </span>
          <span className="profile-name">Chase M</span>
        </div>
      </div>
      <Navigation isMenuOpen={MenuOpen} />
    </header>
  );
};

export default Header;
