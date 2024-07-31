import React from "react";
import { Layout, Menu } from "antd";
import {
  TagsOutlined,
  PercentageOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import Tables from "./components/Tables";

const { Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<BarsOutlined />}>
            Table
          </Menu.Item>
          <Menu.Item key="2" icon={<TagsOutlined />}>
            Promoções
          </Menu.Item>
          <Menu.Item key="3" icon={<PercentageOutlined />}>
            Cupons
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
          Plataforma de Promoções e Cupons ©2024 Criada por Você
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
