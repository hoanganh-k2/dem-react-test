import ModalCreateUser from "./ModalCreateUser";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers, getUserPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
  const LIMIT_USER = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [pageCount, setPageCount] = useState(0);

  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchListUserPaginate(currentPage);
  }, []);

  const fetchListUser = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  const fetchListUserPaginate = async (page) => {
    let res = await getUserPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
      console.log(res);
      setListUsers(res.DT.users);
      setPageCount(res.DT.totalPages);
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
        {/* <TableUser
          listUsers={listUsers}
          handleClickBtnUpdate={handleClickBtnUpdate}
          handleClickBtnView={handleClickBtnView}
          handleClickBtnDelete={handleClickBtnDelete}
        /> */}
        <TableUserPaginate
          listUsers={listUsers}
          handleClickBtnUpdate={handleClickBtnUpdate}
          handleClickBtnView={handleClickBtnView}
          handleClickBtnDelete={handleClickBtnDelete}
          fetchListUserPaginate={fetchListUserPaginate}
          pageCount={pageCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <ModalCreateUser
        show={showModalCreateUser}
        setShow={setShowModalCreateUser}
        fetchListUserPaginate={fetchListUserPaginate}
        setCurrentPage={setCurrentPage}
      ></ModalCreateUser>
      <ModalUpdateUser
        show={showModalUpdateUser}
        setShow={setShowModalUpdateUser}
        dataUpdate={dataUpdate}
        fetchListUserPaginate={fetchListUserPaginate}
        resetUpdateData={resetUpdateData}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
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
        fetchListUserPaginate={fetchListUserPaginate}
        dataDelete={dataDelete}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      ></ModalDeleteUser>
    </div>
  );
};

export default ManageUser;
