import {
  getAllQuizForAdmin,
  getAllUsers,
} from "../../../../services/apiService";
import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { postAssignQuiz } from "../../../../services/apiService";

const AssignQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [listUsers, setListUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState({});

  useEffect(() => {
    fetchTableQuiz();
    fetchUser();
  }, []);

  const fetchTableQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  const fetchUser = async () => {
    let res = await getAllUsers();
    if (res && res.EC === 0) {
      let users = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        };
      });
      setListUsers(users);
    }
  };

  const handleAssignQuiz = async () => {
    let res = await postAssignQuiz(selectedQuiz.value, selectedUsers.value);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="assign-quiz-container row">
      <div className="col-6 form-group">
        <label className="mb-2">Select Quiz:</label>
        <Select
          value={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>

      <div className="col-6 form-group">
        <label className="mb-2">Select User:</label>
        <Select
          value={selectedUsers}
          onChange={setSelectedUsers}
          options={listUsers}
        />
      </div>
      <div>
        <button
          className="btn btn-warning mt-3"
          onClick={() => handleAssignQuiz()}
        >
          {" "}
          Assign
        </button>
      </div>
    </div>
  );
};

export default AssignQuiz;
