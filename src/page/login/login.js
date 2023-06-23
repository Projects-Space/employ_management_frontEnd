import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Card, Row, Col } from "antd";
import "./login.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    console.log("111111111111111", event);
    // Perform login logic here
    // You can make API requests, handle authentication, etc.

    // Clear the input fields

    // Redirect to the dashboard after successful login
    navigate("/dashboard");
  };

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
    >
      <Col>
        <Card
          title="Login"
          bordered={false}
          style={{
            width: 400,
            textAlign: "center",
          }}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <span
                style={{ color: "#1677ff", cursor: "pointer" }}
                // onClick={() => {
                //   navigate("register");
                // }}
              >
                {" "}
                Forgot password
              </span>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ marginRight: "10px" }}
              >
                Log in
              </Button>
              Or{" "}
              <span
                style={{ color: "#1677ff", cursor: "pointer" }}
                onClick={() => {
                  navigate("register");
                }}
              >
                {" "}
                register now!
              </span>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
