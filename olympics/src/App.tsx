import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { BarsOutlined } from "@ant-design/icons";
import Tables from "./components/Tables";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";

const { Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        onBreakpoint={(broken) => {
          if (broken) {
            setCollapsed(true);
          }
        }}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<BarsOutlined />}>
            Medal Table
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: "16px" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <Tables />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Developed by Rayan. Thanks for the API,
          <a
            href="https://github.com/kevle1/paris-2024-olympic-api/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" kevle1."}
          </a>
          <div style={{ marginTop: 10 }}>
            <a
              href="https://github.com/rayanmuryell"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubOutlined style={{ fontSize: 24, margin: "0 10px" }} />
            </a>
            <a
              href="https://www.linkedin.com/in/rayanmuryell"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinOutlined style={{ fontSize: 24, margin: "0 10px" }} />
            </a>
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
