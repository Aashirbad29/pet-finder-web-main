import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/login";
import Cookies from "js-cookie";
import "../../styles/Login.css";

const Login = () => {
  const history = useNavigate();

  useEffect(() => {
    const token = Cookies.get("web-token");

    if (token) {
      history("/");
    }
  }, [history]);

  const onFinish = (values) => {
    login(values)
      .then((res) => {
        Cookies.set("web-user", JSON.stringify(res.tokenUser), { expires: 86400, sameSite: "lax" });
        Cookies.set("web-token", res.token, { expires: 86400, sameSite: "lax" });
        history("/");
      })
      .catch((err) => message.error(err.response.data.msg));
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <header className="login-header">
          <h1>Login to Pet Finder</h1>
          <p>Welcome back! Please login to your account.</p>
        </header>
        <Form layout="vertical" name="login-form" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input email" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <span style={{ marginLeft: "10px" }}>
              or <Link to="/sign-up">Create an account</Link>
            </span>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
