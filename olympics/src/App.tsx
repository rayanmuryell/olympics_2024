import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { TableOutlined, ProjectOutlined, GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import "./styles/Tables.css";
import LoadingSpinner from "./components/LoadingSpinner";
import MedalTable from "./components/MedalTable";
import ComparationTable from "./components/ComparationTable";
import { useMedals } from "./hooks/useMedals";
import AppHeader from "./components/Header";

const { Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeComponent, setActiveComponent] = useState("medalTable"); // Estado para controlar o componente ativo
  const { medals, loading, lastUpdated } = useMedals();

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (activeComponent === "medalTable") {
      return <MedalTable medals={medals} lastUpdated={lastUpdated} />;
    }

    if (activeComponent === "comparationTable") {
      return <ComparationTable data2024={medals} />;
    }

    return null;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <AppHeader />
        <Layout>
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
            style={{ position: 'relative', zIndex: 1 }}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              selectedKeys={[activeComponent]}
              mode="inline"
              onClick={(e) => setActiveComponent(e.key)}
            >
              <Menu.Item key="medalTable" icon={<TableOutlined />}>
                Medal Table
              </Menu.Item>
              <Menu.Item key="comparationTable" icon={<ProjectOutlined />}>
                Compare Results
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ margin: "16px" }}>
              <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
                {renderContent()}
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
      </Layout>
    </Layout>
  );
};

export default App;
