import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Card, Row, Col, Select } from "antd";
import axios from "axios";
import "./register.css";
import Cookies from "universal-cookie";
import authChecker from "../../helper/authChecker";

const ViewEmployee = ({ baseURL, notify }) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const access_token = cookies.get("access_token");
  authChecker(baseURL, notify, navigate, access_token);
  const { id } = useParams();

  return (
    <>
      <div>Upcoming Employee View</div>
      <a href={`/employee/update/${id}`}>Update Screen here...</a>
    </>
  );
};

export default ViewEmployee;
