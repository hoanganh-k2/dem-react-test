import axios from "../utils/axiosCustomize";

const postCreateNewUser = (email, password, userName, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", userName);
  data.append("role", role);
  data.append("image", image);

  return axios.post("api/v1/participant", data);
};

export { postCreateNewUser };
