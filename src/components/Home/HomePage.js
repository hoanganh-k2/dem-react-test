import React from "react";
import video from "../../assets/video-homepage.mp4";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const HomePage = (props) => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title-1">{t("homepage.title1")}</div>
        <div className="title-2">{t("homepage.title2")}</div>
        <div className="title-3">
          {isAuthenticated === true ? (
            <button
              onClick={() => {
                navigate("/users");
              }}
            >
              {t("homepage.title3.doing")}
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              {t("homepage.title3.doing")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
