import React, { useEffect } from "react";
import { Button, Form, Input, InputNumber, message } from "antd";
import { register } from "../../api/login";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../../styles/SignUp.css";

const SignUp = () => {
  const history = useNavigate();

  useEffect(() => {
    const token = Cookies.get("web-token");

    if (token) {
      history("/");
    }
  }, [history]);

  const onFinish = (values) => {
    register(values)
      .then(() => {
        message.success("Registered!");
        history("/login");
      })
      .catch((err) => message.error(err.response.data.msg));
  };

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Please enter your password"));
    }
    if (!/[A-Z]/.test(value)) {
      return Promise.reject(new Error("Password must contain at least one uppercase letter"));
    }
    if (!/[0-9]/.test(value)) {
      return Promise.reject(new Error("Password must contain at least one number"));
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return Promise.reject(new Error("Password must contain at least one special character"));
    }
    return Promise.resolve();
  };

  const validatePhoneNumber = (_, value) => {
    if (value && value.toString().length !== 10) {
      return Promise.reject(new Error("Phone number must be exactly 10 digits"));
    }
    return Promise.resolve();
  };

  return (
    <div className="sign-up-page">
      <div className="sign-up-container">
        <header className="sign-up-header">
          <h1>Sign Up for Pet Finder</h1>
          <p>Create your account to start finding and adopting pets.</p>
        </header>
        <Form layout="vertical" name="sign-up-form" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input name" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input email" }]}>
            <Input type="email" />
          </Form.Item>

          <Form.Item label="Address" name="address" rules={[{ required: true, message: "Please input address" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone_number"
            rules={[{ required: true, message: "Please input phone" }, { validator: validatePhoneNumber }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                validator: validatePassword,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
