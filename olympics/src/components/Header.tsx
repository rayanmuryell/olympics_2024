import React from "react";
import { Menu } from "antd";

const Header: React.FC = () => {
  const items = [
    { label: "Home", key: "/" },
    { label: "Produtos", key: "/products" },
    { label: "Carrinho", key: "/cart" },
  ];

  return (
    <Menu mode="horizontal">
      {items.map((item) => (
        <Menu.Item key={item.key}>
          <a href={item.key}>{item.label}</a>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default Header;
