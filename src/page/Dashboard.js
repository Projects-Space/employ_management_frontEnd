import authChecker from "../helper/authChecker";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const DashboardPage = ({ notify, baseURL }) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const access_token = cookies.get("access_token");
  authChecker(baseURL, notify, navigate, access_token, "all");
  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <button onClick={() => notify("this is long message", "error")}>
        click
      </button>
    </div>
  );
};

export default DashboardPage;
