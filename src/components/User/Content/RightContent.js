const RightContent = (props) => {
  const { dataQuiz } = props;
  return (
    <>
      <div className="main-timer">10:01</div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return (
              <div key={`q-${index}`} className="question">
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
