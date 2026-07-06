import { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { getQuestion, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "./DetailQuiz.scss";

const DetailQuiz = () => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataResult, setDataResult] = useState({});

  const fetchQuestion = useCallback(async () => {
    let res = await getQuestion(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });
          answers = _.orderBy(answers, ["id"], ["asc"]);
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      setDataQuiz(data);
    }
  }, [quizId]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  const handlePrev = () => {
    if (index < 1) {
      return;
    }
    setIndex(index - 1);
  };

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) setIndex(index + 1);
  };

  const handleCheckbox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );
    if (question && question.answers) {
      let b = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      question.answers = b;
    }
    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };

  const handleFinish = async () => {
    let payload = { quizId: +quizId, answers: [] };
    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((item) => {
        let questionId = item.questionId;
        let answerId = [];

        item.answers.forEach((item) => {
          if (item.isSelected) {
            answerId.push(item.id);
          }
        });
        answers.push({
          questionId: +questionId,
          userAnswerId: answerId,
        });
      });
    }
    payload.answers = answers;
    let res = await postSubmitQuiz(payload);
    if (res && res.EC === 0) {
      setIsShowModalResult(true);
      setDataResult({
        countCorrect: res.DT.countCorrect,
        countTotal: res.DT.countTotal,
        quizData: res.DT.quizData,
      });
    } else {
      alert(res?.EM || "Something went wrong");
    }
  };

  return (
    <>
      <Breadcrumb className="custom-breadcrumb">
        <Breadcrumb.Item>
          <NavLink to="/">Home</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/users">User</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Detail Quiz</Breadcrumb.Item>
      </Breadcrumb>
      <div className="detail-quiz-container">
        <div className="left-content">
          <div className="title">
            Quiz {quizId} : {location?.state?.quizTitle}
          </div>
          <hr />
          <div className="q-content">
            <Question
              handleCheckbox={handleCheckbox}
              index={index}
              data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
            />
          </div>
          <div className="footer">
            <button className="btn btn-secondary" onClick={() => handlePrev()}>
              Prev
            </button>
            <button className="btn btn-primary" onClick={() => handleNext()}>
              Next
            </button>
            <button className="btn btn-warning" onClick={() => handleFinish()}>
              Finish
            </button>
          </div>
        </div>
        <div className="right-content">
          <RightContent
            dataQuiz={dataQuiz}
            handleFinish={handleFinish}
            setIndex={setIndex}
          />
        </div>
        <ModalResult
          show={isShowModalResult}
          setShow={setIsShowModalResult}
          dataResult={dataResult}
        />
      </div>
    </>
  );
};

export default DetailQuiz;
