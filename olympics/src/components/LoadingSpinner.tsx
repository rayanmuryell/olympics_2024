import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingSpinner: React.FC = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <Spin indicator={<LoadingOutlined style={{ fontSize: 150 }} spin />} />
  </div>
);

export default LoadingSpinner;
