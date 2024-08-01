import React from "react";
import { Layout } from "antd";
import "../styles/Header.css";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  return (
    <Header className="app-header">
      <div className="logo-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/55/Olympic_rings_with_transparent_rims.svg"
          alt="Logo"
          className="app-logo"
        />
        <h1 className="app-title">Olympic Medal Comparison</h1>
      </div>
    </Header>
  );
};

export default AppHeader;
