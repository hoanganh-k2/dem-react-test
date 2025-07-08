import { useState } from "react";
import { postChangePassword } from "../../services/apiService";
import { toast } from "react-toastify";

const ChangePassword = (props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let res = await postChangePassword(currentPassword, newPassword);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <form className="edit-infor" onSubmit={(event) => handleSubmit(event)}>
      <div className="mb-3 old-password">
        <label class="form-label">Password:</label>
        <input
          type="text"
          class="form-control"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
        />
      </div>
      <div className="mb-3 old-password">
        <label class="form-label label-edit" htmlFor="labelEdit">
          New Password:
        </label>
        <input
          type="text"
          class="form-control"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
      </div>
      <button className="btn btn-primary">Save</button>
    </form>
  );
};

export default ChangePassword;
