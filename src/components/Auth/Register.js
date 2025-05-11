import { useState } from "react";
import "./Register.scss";
import { postRegister } from "../../services/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    let data = await postRegister(email, username, password);
    console.log(data);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <div className="register-container">
      <div className="header">
        <span>Already have an account?</span>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Log in
        </button>
      </div>
      <div className="title col-4 mx-auto">HoiDanIT</div>
      <div className="welcome col-4 mx-auto">Start your journey?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email (*)</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group pass-group">
          <label>Password (*)</label>
          <input
            type={isShowPassword ? "text" : "password"}
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {isShowPassword ? (
            <span
              className="icon-eyes"
              onClick={() => setIsShowPassword(false)}
            >
              <VscEye />
            </span>
          ) : (
            <span className="icon-eyes" onClick={() => setIsShowPassword(true)}>
              <VscEyeClosed />
            </span>
          )}
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type={"text"}
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <button onClick={() => handleRegister()}>
            Create your free account
          </button>
        </div>
        <div className="text-center">
          {" "}
          <span
            className="back"
            onClick={() => {
              navigate("/");
            }}
          >
            &#60;&#60; Go to back HomePage
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
