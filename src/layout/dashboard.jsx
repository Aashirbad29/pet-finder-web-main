import React from "react";
import { DashboardOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const { Header, Content, Sider } = Layout;

const DashboardLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const history = useNavigate();

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "My Requests",
    },
    {
      key: "/dashboard/rescue-request",
      icon: <DashboardOutlined />,
      label: "Rescue Request",
    },
  ];

  const onMenuClick = (event) => {
    const { key } = event;
    history(key);
  };

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["/dashboard"]} items={menuItems} onClick={onMenuClick} />
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Button
            onClick={() => {
              history("/");
            }}
          >
            <HomeOutlined />
          </Button>
          <Button
            onClick={() => {
              Cookies.remove("web-token");
              Cookies.remove("web-user");
              history("/");
            }}
          >
            <LogoutOutlined />
          </Button>
        </Header>

        <Content
          style={{
            margin: "10px",
          }}
        >
          <div
            style={{
              minHeight: "calc(100vh - 100px)",
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
