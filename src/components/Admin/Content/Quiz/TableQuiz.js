import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";

const TableQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);
  const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();
  const [dataDelete, setDataDelete] = useState();

  useEffect(() => {
    fetchTableQuiz();
  }, []);

  const fetchTableQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
      console.log(res);
    }
  };

  const handleUpdateQuiz = (item) => {
    setShowModalUpdateQuiz(true);
    setDataUpdate(item);
  };

  const resetUpdateData = () => {
    setDataUpdate({});
  };

  const handleDeleteQuiz = (item) => {
    setShowModalDeleteQuiz(true);
    setDataDelete(item);
  };

  return (
    <>
      <div className="mt-3">List quizzes:</div>
      <table class="table table-hover table-bordered my-2">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td style={{ display: "flex", gap: "15px" }}>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleUpdateQuiz(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteQuiz(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModalUpdateQuiz
        show={showModalUpdateQuiz}
        setShow={setShowModalUpdateQuiz}
        dataUpdate={dataUpdate}
        resetUpdateData={resetUpdateData}
        fetchTableQuiz={fetchTableQuiz}
      />
      <ModalDeleteQuiz
        show={showModalDeleteQuiz}
        setShow={setShowModalDeleteQuiz}
        dataDelete={dataDelete}
        fetchTableQuiz={fetchTableQuiz}
      />
    </>
  );
};

export default TableQuiz;
