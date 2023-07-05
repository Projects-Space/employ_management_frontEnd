import { Layout, Menu, theme, Space } from "antd";
import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
  PieChartOutlined,
  RadarChartOutlined,
  AlertOutlined,
  TeamOutlined
} from "@ant-design/icons";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Cookies from "universal-cookie";

import LoginPage from "./page/login/login";
import NotFound from "./page/notFound/NotFound";
import DashboardPage from "./page/Dashboard";

import AddEmployee from "./page/employees/AddEmployee";
import ListEmployee from "./page/employees/ListEmployee";
import UpdateEmployee from "./page/employees/UpdateEmployee";
import ViewEmployee from "./page/employees/ViewEmployee";

import MyProfile from "./page/myProfile/MyProfile";

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

const { Content, Sider, Header } = Layout;
const App = () => {
  const cookies = new Cookies();
  const [checkObj, setCheckObj] = useState(cookies.get("checkObj"));
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <BrowserRouter>
      <Layout hasSider>
        <Sider
          style={{
            marginTop: "3rem",
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            background: colorBgContainer,
            display: checkObj ? "block" : "none"
          }}
        >
          <Menu theme="light" mode="inline">
            <Menu.Item
              key="1"
              style={{
                display: cookies.get("checkObj")
                  ? cookies.get("checkObj").userType == "admin"
                    ? "block"
                    : "none"
                  : "block"
              }}
            >
              <TeamOutlined />
              <span>Employees</span>
              <Link to="/employee" />
            </Menu.Item>
            <Menu.Item
              key="2"
              style={{
                display: cookies.get("checkObj")
                  ? cookies.get("checkObj").userType == "admin"
                    ? "block"
                    : "none"
                  : "block"
              }}
            >
              <AlertOutlined />
              <span>Leave's Request</span>
              <Link to="/employee" />
            </Menu.Item>
            <Menu.Item
              key="3"
              style={{
                display: cookies.get("checkObj")
                  ? cookies.get("checkObj").userType == "employ"
                    ? "block"
                    : "none"
                  : "block"
              }}
            >
              <UserOutlined />
              <span>My Profile</span>
              <Link to="/myProfile" />
            </Menu.Item>

            {/* //-------------------------------- */}
            <Menu.Item key="30">
              <RadarChartOutlined />
              <span>Upcoming</span>
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="40">
              <PieChartOutlined />
              <span>Upcoming</span>
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
          <Header
            style={{
              background: colorBgContainer
            }}
          >
            <Space
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                marginTop: "1rem",
                marginRight: "2rem",
                zIndex: 30
              }}
            >
              <BellOutlined
                style={{
                  fontSize: "1.2rem"
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#1890ff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "black";
                }}
              />

              <a href="/login" style={{ color: "black" }}>
                <LogoutOutlined
                  style={{
                    fontSize: "1.2rem"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#1890ff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "black";
                  }}
                  onClick={() => {
                    cookies.remove("access_token", { path: "/" });
                    cookies.remove("checkObj", { path: "/" });
                  }}
                />
              </a>
            </Space>
          </Header>

          {/* notification icon */}

          <Content
            style={{
              margin: "24px 16px",
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
                      setCheckObj={setCheckObj}
                    />
                  }
                />
                <Route
                  exact
                  path="/"
                  element={<DashboardPage notify={notify} baseURL={baseURL} />}
                />
                <Route path="*" element={<NotFound />} />
                {/* //------------------------------------------------------------------------------------ */}
                <Route
                  exact
                  path="/employee/:id"
                  element={<ViewEmployee notify={notify} baseURL={baseURL} />}
                />
                <Route
                  exact
                  path="/employee/update/:id"
                  element={<UpdateEmployee notify={notify} baseURL={baseURL} />}
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
                {/* //------------------------------------------------------------------------------------- */}
                <Route
                  exact
                  path="myProfile"
                  element={<MyProfile notify={notify} baseURL={baseURL} />}
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
