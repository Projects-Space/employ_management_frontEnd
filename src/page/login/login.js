import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Card, Row, Col } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import "./login.css";

const LoginPage = ({ notify, baseURL, setCheckObj }) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  if (cookies.get("access_token")) {
    navigate("/");
  }

  const handleSubmit = (event) => {
    axios
      .post(baseURL + "/auth/log-in", {
        userName: event.userName,
        password: event.password
      })
      .then((data) => {
        notify(data.data.message);
        cookies.set("access_token", data.data.data.access_token, { path: "/" });
        cookies.set("checkObj", data.data.data, { path: "/" });
        setCheckObj(data.data.data);
        navigate("/");
      })
      .catch(({ response }) => {
        notify(response.data.message, "error");
      });
  };

  return (
    <Row
      type="flex"
      justify="center"
      align="center"
      style={{ minHeight: "100vh" }}
    >
      <Col>
        <Card
          title="Login"
          bordered={false}
          style={{
            width: 400,
            textAlign: "center"
          }}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true
            }}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="userName"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!"
                }
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
                  message: "Please input your Password!"
                }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {/* <Form.Item>
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
            </Form.Item> */}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ marginRight: "10px" }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
