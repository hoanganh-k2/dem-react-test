import Select from "react-select";
import "./ManageQuiz.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import { postCreateNewQuiz } from "../../../../services/apiService";
import Accordion from "react-bootstrap/Accordion";
import TableQuiz from "./TableQuiz";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = () => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState();
  const [image, setImage] = useState(null);

  const handleChangFile = (event) => {
    if (event.target && event.target.value && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmitQuiz = async () => {
    //validate
    if (!name || !description) {
      toast.error("Name/Description is required");
      return;
    }

    let res = await postCreateNewQuiz(description, name, type, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setImage(null);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="quiz-container">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manage Quizzes</Accordion.Header>
          <Accordion.Body>
            <div className="quiz-content">
              <fieldset class="border rounded-3 p-3">
                <legend class="float-none w-auto px-3">Add new Quiz:</legend>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <label>Name</label>
                </div>
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                  <label>Description</label>
                </div>
                <div className="my-3">
                  <Select
                    defaultValue={type}
                    onChange={(option) => setType(option.value)}
                    options={options}
                    placeholder="Quiz type..."
                  />
                </div>
                <div className="more-actions form-group">
                  <div>
                    <label className="mb-1">Upload image</label>
                    <input
                      className="form-control"
                      type={"file"}
                      onChange={(event) => handleChangFile(event)}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleSubmitQuiz()}
                  >
                    Submit
                  </button>
                </div>
              </fieldset>
              <div className="list-detail">
                <TableQuiz />
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Assign to Users</Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ManageQuiz;
