import { useEffect, useState } from "react";
import { getListQuiz } from "../../services/apiService";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";

const ListQuiz = () => {
  const navigate = useNavigate();
  const [arrQuiz, setArrQuiz] = useState([]);
  useEffect(() => {
    getQuizData();
  }, []);
  const getQuizData = async () => {
    let res = await getListQuiz();
    if (res && res.EC === 0) {
      setArrQuiz(res.DT);
    }
  };

  return (
    <div className="container list-quiz-container">
      {arrQuiz &&
        arrQuiz.length > 0 &&
        arrQuiz.map((quiz, index) => {
          return (
            <div
              key={quiz.id}
              className="card"
              style={{ width: "18rem" }}
            >
              <img
                src={`data:image/png;base64,${quiz.image}`}
                className="card-img-top"
                alt={quiz.description || `Quiz ${index + 1}`}
              />
              <div className="card-body">
                <h5 className="card-title">Quiz {index + 1}</h5>
                <p className="card-text">{quiz.description}</p>
                <button
                  onClick={() =>
                    navigate(`/quiz/${quiz.id}`, {
                      state: { quizTitle: quiz.description },
                    })
                  }
                  href="#"
                  className="btn btn-primary"
                >
                  Do quiz
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ListQuiz;
