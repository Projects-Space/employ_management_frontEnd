import axios from "axios";

const authChecker = async (
  baseURL,
  notify,
  navigate,
  access_token,
  role = "admin"
) => {
  await axios
    .get(baseURL + "/auth/check", { headers: { access_token } })
    .then(({ data }) => {
      if (role != "all") {
        if (data.data.userType != role) {
          notify("This Area is not accessible", "error");
          navigate("/");
        }
      }
    })
    .catch(({ response }) => {
      notify(response.data.message, "error");
      navigate("/login");
    });
};

export default authChecker;
