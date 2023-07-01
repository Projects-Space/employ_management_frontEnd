import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import LoginPage from "./page/login/login";
import NotFound from "./page/notFound/NotFound";
import DashboardPage from "./page/Dashboard";

import AddEmployee from "./page/employees/AddEmployee";
import ListEmployee from "./page/employees/ListEmployee";
import ViewEmployee from "./page/employees/ViewEmployee";

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

const { Header, Content, Footer, Sider } = Layout;
const App = () => {
  const [sliderOn, setSliderOn] = useState(true);
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
            // items={items}
          >
            <Menu.Item key="1">
              <UserOutlined />
              <span>Employees</span>
              <Link to="/employee" />
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
                height: "100vh",
                textAlign: "center"
              }}
            >
              <Toaster position="top-right" reverseOrder={false} />
              <Routes>
                <Route
                  exact
                  path="/login"
                  element={
                    <LoginPage
                      notify={notify}
                      baseURL={baseURL}
                      setSliderOn={setSliderOn}
                    />
                  }
                />
                <Route
                  exact
                  path="/"
                  element={<DashboardPage notify={notify} baseURL={baseURL} />}
                />
                <Route
                  path="*"
                  element={<NotFound setSliderOn={setSliderOn} />}
                />

                <Route
                  exact
                  path="/employee/view"
                  element={<ViewEmployee notify={notify} baseURL={baseURL} />}
                />
                <Route
                  exact
                  path="/employee/add"
                  element={<AddEmployee notify={notify} baseURL={baseURL} />}
                />
                <Route
                  exact
                  path="employee"
                  element={<ListEmployee notify={notify} baseURL={baseURL} />}
                />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};
export default App;
