import { message } from "antd";
import axios from "axios";

const authChecker = async (baseURL, notify, navigate) => {
  await axios
    .get(baseURL + "/auth/check", { withCredentials: true })
    .catch(({ response }) => {
      notify(response.data.message, "error");
      navigate("/login");
    });
};

export default authChecker;
