import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from "./page/login/login";
import RegisterPage from "./page/register/register";

const DashboardPage = () => {
  return <h2>Welcome to the Dashboard</h2>;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="dashboard" element={<DashboardPage />} />
        <Route exact path="register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
    // <Router>
    //   <Switch>
    //     <Route exact path="/">
    //       <LoginPage />
    //     </Route>
    //     <Route path="/dashboard">
    //       <DashboardPage />
    //     </Route>
    //   </Switch>
    // </Router>
  );
};

export default App;
