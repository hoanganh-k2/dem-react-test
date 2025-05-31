import { useState } from "react";
import Select from "react-select";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import "./Questions.scss";

const Questions = (props) => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState();

  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "question 1",
      imageFile: "",
      imageName: "",
      answer: [
        {
          id: uuidv4(),
          description: "answer 1",
          isCorrect: false,
        },
      ],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answer: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionClone = _.cloneDeep(questions);
      questionClone = questionClone.filter((item) => item.id !== id);

      setQuestions(questionClone);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      let index = questionClone.findIndex((item) => item.id === questionId);
      questionClone[index].answer.push(newAnswer);
      setQuestions(questionClone);
    }
    if (type === "REMOVE") {
      let index = questionClone.findIndex((item) => item.id === questionId);
      questionClone[index].answer = questionClone[index].answer.filter(
        (item) => item.id !== answerId
      );
      setQuestions(questionClone);
    }
  };

  console.log(questions);
  return (
    <div className="questions-container">
      <div className="title">Manage Questions</div>
      <hr />
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
        <div className="mt-3 mb-2">Add question:</div>
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div key={`q-${index}`} className="q-main mb-3">
                <div className="question-content">
                  <div class="form-floating description">
                    <input
                      type="type"
                      class="form-control"
                      placeholder="Description"
                      value={question.description}
                    />
                    <label>Question {index + 1} description: </label>
                  </div>
                  <div className="group-upload">
                    <label>
                      <RiImageAddFill className="label-up" />
                    </label>
                    <input type="file" hidden></input>
                    <span>0 file is uploaded</span>
                  </div>
                  <div className="btn-add">
                    <span>
                      <FiPlusCircle
                        className="icon-add"
                        onClick={() => handleAddRemoveQuestion("ADD", "")}
                      />
                    </span>
                    {questions.length > 1 && (
                      <span>
                        <FiMinusCircle
                          className="icon-remove"
                          onClick={() =>
                            handleAddRemoveQuestion("REMOVE", question.id)
                          }
                        />
                      </span>
                    )}
                  </div>
                </div>
                {question.answer &&
                  question.answer.length > 0 &&
                  question.answer.map((answer, index) => {
                    return (
                      <div key={`a-${index}`} className="answers-content">
                        <input
                          className="form-check-input iscorrect"
                          type="checkbox"
                        />
                        <div class="form-floating description answer-name">
                          <input
                            type="type"
                            class="form-control"
                            placeholder="Answer"
                            value={answer.description}
                          />
                          <label>Answers {index + 1}</label>
                        </div>
                        <div className="btn-group">
                          <span
                            onClick={() =>
                              handleAddRemoveAnswer("ADD", question.id)
                            }
                          >
                            <FiPlusCircle className="icon-add" />
                          </span>
                          {question.answer.length > 1 && (
                            <span
                              onClick={() =>
                                handleAddRemoveAnswer(
                                  "REMOVE",
                                  question.id,
                                  answer.id
                                )
                              }
                            >
                              <FiMinusCircle className="icon-remove" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Questions;
