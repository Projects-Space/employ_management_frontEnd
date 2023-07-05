import { List, Button, Space, Pagination, Input } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import authChecker from "../../helper/authChecker";
const { Search } = Input;

const ListEmployee = ({ baseURL, notify, setTransporter }) => {
  const [data, setData] = useState([]);
  const [reqObj, setReqObj] = useState({
    page: 1,
    search: ""
  });
  const navigate = useNavigate();
  const cookies = new Cookies();
  const access_token = cookies.get("access_token");
  authChecker(baseURL, notify, navigate, access_token);
  const [totalDoc, setTotalDoc] = useState(0);
  useEffect(() => {
    axios
      .post(
        baseURL + "/user/list",
        {
          search: reqObj.search,
          page: reqObj.page
        },
        { headers: { access_token } }
      )
      .then(({ data }) => {
        setTotalDoc(data.data.totalDocs * 1);
        setData(data.data.list);
      })
      .catch(({ response }) => {
        console.log(response);
        notify("Something went wrong with...", "error");
      });
  }, [reqObj]);

  const onSearch = (e) => {
    setReqObj({ ...reqObj, search: e });
  };

  return (
    <>
      <Space
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          marginBottom: "3rem",
          marginRight: "3rem",
          zIndex: 3
        }}
      >
        <a href="/employee/add">
          <Button type="primary">New Employee</Button>
        </a>
      </Space>
      <Space
        style={{
          position: "absolute",
          right: 0,
          marginTop: "3.5rem",
          marginRight: "2rem",
          zIndex: 3
        }}
      >
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
        />
      </Space>
      <Space style={{ fontSize: "2rem" }}>Employee</Space>
      <Pagination
        defaultCurrent={reqObj}
        total={totalDoc}
        style={{
          position: "absolute",
          right: 0,
          marginTop: "-2rem",
          marginRight: "2rem",
          zIndex: 3
        }}
        onChange={(e) => {
          setReqObj({ ...reqObj, page: e });
        }}
      />
      <List
        style={{
          marginTop: "4rem"
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <div className="list-div">
              <Link to={`/employee/${item._id}`}>
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
export default ListEmployee;
