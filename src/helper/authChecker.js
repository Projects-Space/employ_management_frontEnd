import { message } from "antd";
import axios from "axios";

const authChecker = async (baseURL, notify, navigate, access_token) => {
  await axios
    .get(baseURL + "/auth/check", { headers: { access_token } })
    .catch(({ response }) => {
      notify(response.data.message, "error");
      navigate("/login");
    });
};

export default authChecker;
