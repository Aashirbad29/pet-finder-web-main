import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "../../styles/pagenotfoundstyles.css";

const PageNotFound = () => {
  return (
    <div className="pagenotfound-layout">
      <div className="pagenotfound-container">
        <h1>404 - Page Not Found</h1>
        <p>
          Sorry, the page you are looking for does not exist. You can always go back to the '<Link to="/">homepage</Link>'.
        </p>
        <Link to="/">
          <Button type="primary">Go Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
