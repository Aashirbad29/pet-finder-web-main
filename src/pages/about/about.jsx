import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "../../styles/aboutstyles.css";

const AboutPage = () => {
  return (
    <div className="about-layout">
      <div className="about-container">
        <h1>About KATS NEPAL</h1>
        <p>
          KATS NEPAL is a dedicated animal welfare organization committed to rescuing, rehabilitating, and rehoming stray and
          abandoned pets. Our mission is to provide a safe haven for animals in need and to promote animal welfare through
          education, advocacy, and community outreach.
        </p>
        <p>
          Our team of passionate volunteers works tirelessly to ensure that every animal receives the care, love, and respect
          they deserve. We believe in a world where every pet has a loving home and every person understands the importance
          of responsible pet ownership.
        </p>
        <Link to="/contact">
          <Button type="primary">Contact Us</Button>
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
