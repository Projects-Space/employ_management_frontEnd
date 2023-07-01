import { List, Button, Space } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewEmployee = ({ baseURL, notify }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post(baseURL + "/user/list", {})
      .then(({ data }) => {
        setData(data.data.list);
      })
      .catch(({ response }) => {
        console.log(response);
        notify("Something went wrong with...", "error");
      });
  }, []);
  return (
    <>
      <Space
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          marginBottom: "3rem",
          marginRight: "3rem"
        }}
      >
        <Button type="primary">New Employee</Button>
      </Space>
      <Space style={{ fontSize: "2rem" }}>Employee</Space>
      <List
        pagination={{
          position: "top",
          align: "end"
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <div className="list-div">
              <Link to={`/empolyee/view`}>
                <List.Item.Meta
                  title={item.fullName}
                  description={item.designation ? item.designation : " "}
                />
              </Link>
            </div>
          </List.Item>
        )}
      />
    </>
  );
};
export default ViewEmployee;
