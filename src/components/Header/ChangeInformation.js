import { toast } from "react-toastify";
import { postUpdateProfile } from "../../services/apiService";
import { BsPencilSquare } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./ChangeInformation.scss";

const ChangeInformation = () => {
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const username = useSelector((state) => state.user.account.username);
  const userImage = useSelector((state) => state.user.account.image);

  useEffect(() => {
    if (userImage) {
      setPreviewImage(`data:image/png;base64,${userImage}`);
    }
    if (username) {
      setName(username);
    }
  }, [userImage, username]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let res = await postUpdateProfile(name, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <form className="edit-infor" onSubmit={(event) => handleSubmit(event)}>
      <div className="mb-3 name">
        <label className="form-label">User Name:</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="mb-3 image">
        <div className="img-preview">
          {previewImage ? <img src={previewImage} alt="Preview" /> : null}
          {/* <span>Preview Image</span> */}
        </div>
        <label className="form-label label-edit" htmlFor="labelEdit">
          <BsPencilSquare /> Edit Image:
        </label>
        <input
          type="file"
          id="labelEdit"
          hidden
          className="form-control"
          onChange={(event) => handleUploadImage(event)}
        />
      </div>
      <button className="btn btn-primary">Save</button>
    </form>
  );
};

export default ChangeInformation;
