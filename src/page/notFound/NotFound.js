import React from "react";
import { useNavigate } from "react-router-dom";
import "./notFound.css";

const NotFoundPage = ({ setSliderOn }) => {
  const navigate = useNavigate();
  setSliderOn(false);

  return (
    <div className="not-found-main">
      <div className="not-found-fof">
        <h1>Error 404</h1>
      </div>
    </div>
  );
};

export default NotFoundPage;
