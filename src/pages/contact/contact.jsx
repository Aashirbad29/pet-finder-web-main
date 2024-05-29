import React from "react";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Card, Row, Col } from "antd";
import "../../styles/contactstyles.css";

const ContactPage = () => {
  return (
    <div className="contact-layout">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24}>
            <div className="contact-item">
              <PhoneOutlined style={{ marginRight: 10 }} />
              <span>+977 9803019373</span>
            </div>
          </Col>
          <Col xs={24}>
            <div className="contact-item">
              <MailOutlined style={{ marginRight: 10 }} />
              <span>katinfo@katcentre.org</span>
            </div>
          </Col>
          <Col xs={24}>
            <Button type="primary" style={{ marginBottom: 20 }}>
              <a href="mailto:katinfo@katcentre.org" style={{ color: "#fff" }}>
                Email Us
              </a>
            </Button>
          </Col>
          <Col xs={24}>
            <Card title="Location" className="contact-card">
              <p>Rudreshwor, Budhanilkantha-02</p>
              <p>Kathmandu, Nepal</p>
            </Card>
          </Col>
          <Col xs={24}>
            <Card title="Opening Hours" className="contact-card">
              <p>10:00am - 4:00pm</p>
              <p>Closes on Saturday</p>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContactPage;
