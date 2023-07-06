import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { Card, Row, Col, Form, Select } from "antd";
import moment from "moment";
import axios from "axios";
import Cookies from "universal-cookie";
import authChecker from "../../helper/authChecker";
const { Option } = Select;

const LeaveRequest = ({ notify, baseURL }) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const access_token = cookies.get("access_token");
  authChecker(baseURL, notify, navigate, access_token, "admin");

  const [form] = Form.useForm();
  const [leaveData, setLeaveData] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    axios
      .get(baseURL + "/leave/list", { headers: { access_token } })
      .then(({ data }) => {
        setLeaveData(data.data);
      })
      .catch(({ respose }) => {
        console.log("respose", respose);
        notify("Something went wrong", "error");
      });
  }, []);

  const changeStatusHandler = (e) => {
    const a = e.split("-");
    axios
      .post(
        baseURL + "/leave/change-status",
        {
          id: a[1],
          status: a[0]
        },
        { headers: { access_token } }
      )
      .then(({ data }) => {
        notify(data.message);
      })
      .catch(({ response }) => {
        notify(response.data.message, "error");
      });
  };

  const leaveTypeCard = {
    width: 500,
    textAlign: "left",
    fontSize: "1rem"
  };
  const fromToCard = {
    width: 200,
    textAlign: "center",
    fontSize: "1rem"
  };
  const leaveDaysCard = {
    width: 150,
    textAlign: "center",
    fontSize: "1rem"
  };
  const actionCard = {
    width: 80,
    textAlign: "center",
    fontSize: "1rem",
    color: "#1890ff"
  };
  const optionStyle = {
    width: 100
  };

  return (
    <>
      <Row justify="center" align="center">
        <Col>
          <Card
            style={{
              fontSize: "1.6rem"
            }}
          >
            Approve Leave From here
          </Card>
        </Col>
      </Row>
      <Row justify="center" align="center">
        <Col>
          <Card
            bordered={false}
            style={{ ...leaveTypeCard, fontWeight: "bold" }}
          >
            <div>Type of Leave</div>
          </Card>
        </Col>
        <Col>
          <Card bordered={false} style={{ ...fromToCard, fontWeight: "bold" }}>
            <div>From /To</div>
          </Card>
        </Col>
        <Col>
          <Card
            bordered={false}
            style={{ ...leaveDaysCard, fontWeight: "bold" }}
          >
            <div>Leave Days</div>
          </Card>
        </Col>
        <Col>
          <Card bordered={false} style={{ ...actionCard, fontWeight: "bold" }}>
            <div></div>
          </Card>
        </Col>
      </Row>
      {leaveData.map((item) => {
        return (
          <Row justify="center" align="center">
            <Col>
              <Card bordered={false} style={leaveTypeCard}>
                <Tooltip title={item.leaveDescription} placement="top-start">
                  <div>{item.typeOfLeave}</div>
                </Tooltip>
              </Card>
            </Col>
            <Col>
              <Card bordered={false} style={fromToCard}>
                <Tooltip
                  title={
                    (item.firstHalf ? "First Half" : "") +
                    " / " +
                    (item.secondHalf ? "Second Half" : "")
                  }
                  placement="top-start"
                >
                  <div>
                    {moment(item.startDate).format("DD MMM")} -{" "}
                    {moment(item.endDate).format("DD MMM, YY")}
                  </div>
                </Tooltip>
              </Card>
            </Col>
            <Col>
              <Card bordered={false} style={leaveDaysCard}>
                <Tooltip
                  title={
                    (item.firstHalf ? "First Half" : "") +
                    " / " +
                    (item.secondHalf ? "Second Half" : "")
                  }
                  placement="top"
                >
                  <div>{item.numberOfLeave}</div>
                </Tooltip>
              </Card>
            </Col>
            <Col>
              <Card bordered={false} style={actionCard}>
                <Select
                  defaultValue={
                    item.status.charAt(0).toUpperCase() + item.status.slice(1)
                  }
                  style={optionStyle}
                  placeholder="select your gender"
                  dropdownStyle={{ zIndex: 1000, marginTop: "2rem" }}
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  onChange={(e) => changeStatusHandler(e)}
                >
                  <Option value={"confirm-" + item._id}>Confirm</Option>
                  <Option value={"pending-" + item._id}>Pending</Option>
                  <Option value={"reject-" + item._id}>Reject</Option>
                </Select>
              </Card>
            </Col>
          </Row>
        );
      })}
    </>
  );
};

export default LeaveRequest;