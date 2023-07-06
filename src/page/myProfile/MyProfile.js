import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import Tooltip from "@mui/material/Tooltip";
import {
  Space,
  Card,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Checkbox
} from "antd";
import moment from "moment";
import axios from "axios";
import Cookies from "universal-cookie";
import authChecker from "../../helper/authChecker";
const { Option } = Select;
const { RangePicker } = DatePicker;

const MyProfile = ({ notify, baseURL }) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const access_token = cookies.get("access_token");
  authChecker(baseURL, notify, navigate, access_token, "admin");

  const [form] = Form.useForm();
  const [profile, setProfile] = useState({});
  const [leaveData, setLeaveData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [checkBox, setCheckBox] = useState({
    firstHalf: false,
    secondHalf: false
  });

  // useEffect(() => {
  //   axios
  //     .get(baseURL + "/user/getProfile", { headers: { access_token } })
  //     .then(({ data }) => {
  //       setProfile(data.data);
  //       setLeaveData(data.data.leaveData);
  //     })
  //     .catch(({ respose }) => {
  //       console.log("respose", respose);
  //       notify("Something went wrong", "error");
  //     });
  // }, []);

  const deleteBtnHandler = (e) => {
    const id = e.target.id ? e.target.id : e.target.parentNode.id;
    axios
      .get(baseURL + "/leave/remove/" + id, {
        headers: { access_token }
      })
      .then(({ data }) => {
        window.location.reload();
        notify(data.message);
      })
      .catch(({ respose }) => {
        if (respose) {
          notify(respose.data.message, "error");
        }
      });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values, checkBox);
        axios
          .post(
            baseURL + "/leave/apply",
            {
              typeOfLeave: values.typeOfLeave,
              leaveDescription: values.leaveDescription,
              startDate: values.dateRange[0],
              endDate: values.dateRange[1],
              ...checkBox
            },
            { headers: { access_token } }
          )
          .then(({ data }) => {
            window.location.reload();
            notify(data.message);
            setVisible(false);
          })
          .catch(({ response }) => {
            notify(response.data.message, "error");
            console.log(response.data.message);
          });
      })
      .catch((data) => {});
  };

  const checkboxHandler = (e) => {
    setCheckBox({ ...checkBox, [e.target.id]: e.target.checked });
  };

  const cardStyle = {
    background: "#d0d1d3",
    height: "8rem",
    width: "20rem",
    cursor: "default",
    color: "rgb(118 118 118)",
    margin: "0rem 1rem"
  };
  const leaveTypeCard = {
    width: 500,
    textAlign: "left",
    fontSize: "1rem"
  };
  const statusCard = {
    width: 110,
    textAlign: "center",
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

  return (
    <>
      <Row justify="center" align="center">
        <Col>
          <Card
            bordered={false}
            style={{
              width: 400,
              textAlign: "center",
              fontSize: "2rem"
            }}
          >
            <div>{profile.firstName + " " + profile.lastName}</div>
          </Card>
        </Col>
      </Row>
      <Row justify="center" align="center">
        <Col>
          <Card style={cardStyle}>
            <div>Attendance Percentage</div>
            <div
              style={{
                fontSize: "1.8rem",
                fontWeight: "bold"
              }}
            >
              {parseFloat(
                (profile.availableLeaves /
                  (profile.usedLeaves + profile.availableLeaves)) *
                  100
              ).toFixed(2)}
              %
            </div>
          </Card>
        </Col>
        <Col>
          <Card style={cardStyle}>
            <div>Leave Balance</div>
            <div
              style={{
                fontSize: "1.8rem",
                fontWeight: "bold"
              }}
            >
              {profile.usedLeaves +
                "/" +
                (profile.availableLeaves + profile.usedLeaves)}
            </div>
          </Card>
        </Col>
        <Col>
          <Card style={cardStyle}>
            <div>Public Holidays</div>
            <div
              style={{
                fontSize: "1.8rem",
                fontWeight: "bold"
              }}
            >
              10
            </div>
          </Card>
        </Col>
      </Row>
      <Row justify="center" align="center">
        <Col>
          <Card
            bordered={false}
            style={{
              width: 400,
              textAlign: "center",
              fontSize: "2rem"
            }}
          >
            <div>Leave List</div>
          </Card>
        </Col>
      </Row>
      <Space
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "flex-end",
          top: "22rem",
          right: "17rem"
        }}
      >
        <Modal
          open={visible}
          title="Modal Title"
          onCancel={() => setVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setVisible(false)}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              Submit
            </Button>
          ]}
        >
          <Form form={form}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Fill this"
                }
              ]}
              name="typeOfLeave"
              label="Type Of Leave"
            >
              <Select
                placeholder="select your gender"
                dropdownStyle={{ zIndex: 1000, marginTop: "2rem" }}
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
              >
                <Option value="Sick Leave">Sick Leave</Option>
                <Option value="Family Function">Family Function</Option>
                <Option value="Casual Leave">Casual Leave</Option>
                <Option value="Maternity Leave">Maternity Leave</Option>
                <Option value="Paternity Leave">Paternity Leave</Option>
                <Option value="Studay Leave">Studay Leave</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Fill this"
                }
              ]}
              name="dateRange"
              label="From / To"
            >
              <RangePicker
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Fill this"
                }
              ]}
              name="leaveDescription"
              label="Description"
            >
              <Input />
            </Form.Item>
            <Checkbox
              id="firstHalf"
              onChange={(e) => {
                checkboxHandler(e);
              }}
            >
              First Half
            </Checkbox>
            <Checkbox
              id="secondHalf"
              onChange={(e) => {
                checkboxHandler(e);
              }}
            >
              Second Half
            </Checkbox>
          </Form>
        </Modal>
        <Button type="primary" onClick={() => setVisible(true)}>
          Apply for Leave
        </Button>
      </Space>
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
          <Card bordered={false} style={{ ...statusCard, fontWeight: "bold" }}>
            <div>Status</div>
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
        console.log(item);
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
              <Card
                bordered={false}
                style={{
                  ...statusCard,
                  color:
                    item.status == "confirm"
                      ? "#6fb86f"
                      : item.status == "reject"
                      ? "#df3e42"
                      : "#f76400"
                }}
              >
                <div>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </div>
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
                <Button
                  style={{
                    display: item.status == "pending" ? "block" : "none",
                    color: "red",
                    border: "1px solid red"
                  }}
                  id={item._id}
                  onClick={(e) => {
                    deleteBtnHandler(e);
                  }}
                >
                  Delete
                </Button>
              </Card>
            </Col>
          </Row>
        );
      })}
    </>
  );
};

export default MyProfile;
