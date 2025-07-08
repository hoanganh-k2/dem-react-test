import { toast } from "react-toastify";
import { postUpdateProfile } from "../../services/apiService";
import { BsPencilSquare } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./ChangeInformation.scss";

const ChangeInformation = () => {
  const [previewImage, setPreviewImage] = useState("");
  const [name, setName] = useState("");

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
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
    let res = await postUpdateProfile(name, previewImage);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <form className="edit-infor" onSubmit={(event) => handleSubmit(event)}>
      <div className="mb-3 name">
        <label class="form-label">User Name:</label>
        <input
          type="text"
          class="form-control"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="mb-3 image">
        <div className="img-preview">
          <img src={previewImage} />
          {/* <span>Preview Image</span> */}
        </div>
        <label class="form-label label-edit" htmlFor="labelEdit">
          <BsPencilSquare /> Edit Image:
        </label>
        <input
          type="file"
          id="labelEdit"
          hidden
          class="form-control"
          onChange={(event) => handleUploadImage(event)}
        />
      </div>
      <button className="btn btn-primary">Save</button>
    </form>
  );
};

export default ChangeInformation;
