import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Card, Row, Col, Select } from "antd";
import axios from "axios";
import "./register.css";
import Cookies from "universal-cookie";

const AddEmployee = ({ baseURL, notify }) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const { Option } = Select;
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 8
      }
    },
    wrapperCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 16
      }
    }
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };

  const validateNumber = (rule, value, callback) => {
    if (value && !/^\d+$/.test(value)) {
      callback("Please enter a valid number.");
    } else {
      callback();
    }
  };

  const [form] = Form.useForm();
  const prefixSelector = (
    <Form.Item name="phonePrefix" noStyle>
      <Select
        style={{
          width: 70
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const handleSubmit = async (event) => {
    const access_token = cookies.get("access_token");
    await axios
      .post(baseURL + "/user/add", event, { headers: { access_token } })
      .then(({ data }) => {
        notify(data.message);
        navigate("/");
      })
      .catch(({ response }) => {
        notify(response.data.data, "error");
      });
    // navigate("/");
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
          title="Register"
          bordered={false}
          style={{
            width: 450,
            textAlign: "center"
          }}
        >
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={handleSubmit}
            initialValues={{
              residence: ["zhejiang", "hangzhou", "xihu"],
              prefix: "86"
            }}
            style={{
              maxWidth: 600
            }}
            scrollToFirstError
          >
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Please input your First Name!"
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Please input your Last Name!"
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="userName"
              label="User Name"
              rules={[
                {
                  required: true,
                  message: "Please input your User Name!"
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your Phone Number!" },
                { validator: validateNumber }
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: "100%"
                }}
              />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                {
                  required: true,
                  message: "Please select gender!"
                }
              ]}
            >
              <Select placeholder="select your gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="designation"
              label="Designation"
              rules={[
                {
                  required: true,
                  message: "Please input your Designation!"
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default AddEmployee;
