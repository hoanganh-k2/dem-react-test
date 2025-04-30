import { useState } from "react";
import ModalCreateUser from "./ModalCreateUser";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModalCreateUser(true)}
          >
            Add new User
          </button>
        </div>
      </div>
      <div className="table-user-container">table user</div>
      <ModalCreateUser
        show={showModalCreateUser}
        setShow={setShowModalCreateUser}
      ></ModalCreateUser>
    </div>
  );
};

export default ManageUser;
