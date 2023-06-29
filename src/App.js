import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from "@ant-design/icons";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import LoginPage from "./page/login/login";
import RegisterPage from "./page/register/register";
import toast, { Toaster } from "react-hot-toast";

const baseURL = "http://localhost:4000/api/v1";

const notify = (message, type = "success") => {
  if (type == "success") {
    toast.success(message, {
      style: {
        border: "1px solid #32cd32",
        padding: "16px"
      }
    });
  } else if (type == "error") {
    toast.error(message, {
      style: {
        border: "1px solid #FF3333",
        padding: "16px"
      }
    });
  }
};

const DashboardPage = () => {
  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <button onClick={() => notify("this is long message", "error")}>
        click
      </button>
    </div>
  );
};

const { Header, Content, Footer, Sider } = Layout;
const App = () => {
  const [sliderOn, setSliderOn] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  return (
    <BrowserRouter>
      <Layout hasSider>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            background: colorBgContainer,
            display: sliderOn ? "block" : "none"
          }}
        >
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            // items={items}
          >
            <Menu.Item key="1">
              <UserOutlined />
              <span>this</span>
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="2">
              <UserOutlined />
              <span>this</span>
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="3">
              <UserOutlined />
              <span>this</span>
              <Link to="/" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="site-layout"
          style={
            {
              // marginLeft: 10
            }
          }
        >
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial"
            }}
          >
            <div
              style={{
                padding: 24,
                textAlign: "center"
              }}
            >
              <Toaster position="top-right" reverseOrder={false} />
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <LoginPage
                      notify={notify}
                      baseURL={baseURL}
                      setSliderOn={setSliderOn}
                    />
                  }
                />
                <Route exact path="dashboard" element={<DashboardPage />} />
                <Route exact path="register" element={<RegisterPage />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};
export default App;
