import ModalCreateUser from "./ModalCreateUser";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchListUser();
  }, []);

  const fetchListUser = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  const handleClickBtnUpdate = (item) => {
    setShowModalUpdateUser(true);
    setDataUpdate(item);
  };

  const resetUpdateData = () => {
    setDataUpdate({});
  };

  const handleClickBtnView = (item) => {
    setShowModalViewUser(true);
    setDataUpdate(item);
  };

  const handleClickBtnDelete = (item) => {
    setShowModalDeleteUser(true);
    setDataDelete(item);
  };

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
      <div className="table-user-container">
        <TableUser
          listUsers={listUsers}
          handleClickBtnUpdate={handleClickBtnUpdate}
          handleClickBtnView={handleClickBtnView}
          handleClickBtnDelete={handleClickBtnDelete}
        />
      </div>
      <ModalCreateUser
        show={showModalCreateUser}
        setShow={setShowModalCreateUser}
        fetchListUser={fetchListUser}
      ></ModalCreateUser>
      <ModalUpdateUser
        show={showModalUpdateUser}
        setShow={setShowModalUpdateUser}
        dataUpdate={dataUpdate}
        fetchListUser={fetchListUser}
        resetUpdateData={resetUpdateData}
      ></ModalUpdateUser>
      <ModalViewUser
        show={showModalViewUser}
        setShow={setShowModalViewUser}
        dataUpdate={dataUpdate}
        resetUpdateData={resetUpdateData}
      ></ModalViewUser>
      <ModalDeleteUser
        show={showModalDeleteUser}
        setShow={setShowModalDeleteUser}
        fetchListUser={fetchListUser}
        dataDelete={dataDelete}
      ></ModalDeleteUser>
    </div>
  );
};

export default ManageUser;
