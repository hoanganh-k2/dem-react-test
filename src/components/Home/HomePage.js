import React from "react";
import video from "../../assets/video-homepage.mp4";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title-1">There's a better way to ask</div>
        <div className="title-2">
          you don't want to make a boring form. And your audience won't answer
          one. Create a typeform instead-and make everybody happy.
        </div>
        <div className="title-3">
          {isAuthenticated === true ? (
            <button
              onClick={() => {
                navigate("/users");
              }}
            >
              {" "}
              Do quiz now
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Get's started. It's free
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
