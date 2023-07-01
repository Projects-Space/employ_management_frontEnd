import authChecker from "../helper/authChecker";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const DashboardPage = ({ notify, baseURL }) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  setTimeout(() => {
    authChecker(baseURL, notify, navigate);
  }, 10000);
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
