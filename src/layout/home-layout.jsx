import React from "react";
import { Button, Layout, Menu, theme, Row, Col } from "antd";
import { Outlet, useNavigate, Link } from "react-router-dom";
import Title from "antd/es/typography/Title";
import Cookies from "js-cookie";
import {
  LogoutOutlined,
  FacebookOutlined,
  XOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  LinkedinOutlined,
  QqOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

const items = [
  { key: "/", label: "Home" },
  { key: "/pets", label: "Pets" },
  { key: "/contact", label: "Contact Us" },
  { key: "/about", label: "About Us" },
];

const HomeLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const history = useNavigate();

  return (
    <Layout>
      <Header style={{ padding: 0 }}>
        <Row align="middle" justify="space-between">
          <Col>
            <Link to="/" style={{ display: "flex", alignItems: "center", paddingLeft: 24 }}>
              <QqOutlined style={{ fontSize: "24px", color: "goldenrod", marginRight: 8 }} />
              <Title style={{ color: "goldenrod", marginBottom: 0 }} level={5}>
                Pet Finder
              </Title>
            </Link>
          </Col>
          <Col flex="auto">
            <Menu theme="dark" mode="horizontal" items={items} style={{ minWidth: 0 }} onClick={(e) => history(e.key)} />
          </Col>
          <Col>
            <div style={{ display: "flex", gap: 20, paddingRight: 24 }}>
              {Cookies.get("web-token") && <Button onClick={() => history("/dashboard")}>My Request</Button>}
              {Cookies.get("web-user") ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Title level={5} style={{ color: "goldenrod", marginRight: 20, marginBottom: 0 }}>
                    Welcome, {JSON.parse(Cookies.get("web-user")).name}
                  </Title>
                  <Button
                    onClick={() => {
                      Cookies.remove("web-token");
                      Cookies.remove("web-user");
                      history("/");
                    }}
                  >
                    <LogoutOutlined />
                  </Button>
                </div>
              ) : (
                <>
                  <Button onClick={() => history("/login")}>Login</Button>
                  <Button onClick={() => history("/sign-up")}>Sign Up</Button>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Header>
      <Content>
        <div
          style={{
            background: colorBgContainer,
            minHeight: "81vh",
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <Row justify="center">
          <Col xs={24} sm={12} md={6} lg={6} xl={4}>
            <div style={{ marginBottom: 10 }}>
              <a href="https://www.facebook.com/katcentrenepal">
                <FacebookOutlined style={{ fontSize: "20px", marginRight: 20 }} />
              </a>
              <a href="https://twitter.com">
                <XOutlined style={{ fontSize: "20px", marginRight: 20 }} />
              </a>
              <a href="https://www.instagram.com/katcentrenepal/">
                <InstagramOutlined style={{ fontSize: "20px", marginRight: 20 }} />
              </a>
              <a href="https://www.youtube.com">
                <YoutubeOutlined style={{ fontSize: "20px", marginRight: 20 }} />
              </a>
              <a href="https://www.linkedin.com/in/kat-centre-nepal-b557a1235/">
                <LinkedinOutlined style={{ fontSize: "20px", marginRight: 20 }} />
              </a>
            </div>
            KATS NEPAL RESERVED ©{new Date().getFullYear()}
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};

export default HomeLayout;
