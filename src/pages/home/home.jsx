import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import banner from "../../images/banner.jpg";
import "../../styles/homestyles.css";

const HomePage = () => {
  return (
    <div className="hero-layout">
      <img src={banner} className="hero-image" alt="Banner" />
      <div className="hero-container">
        <h1 style={{ color: "purple" }}>Welcome to the Pet Adoption Center</h1>
        <Link to="/pets">
          <button>ADOPT NOW</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
