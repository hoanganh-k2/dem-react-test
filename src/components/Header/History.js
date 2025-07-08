import { useEffect, useState } from "react";
import { getHistory } from "../../services/apiService";

const History = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    let res = await getHistory();
    if (res && res.EC === 0) {
      setData(res.DT.data);
    }
    console.log(res);
  };
  console.log(data);
  return (
    <div className="history-container">
      {data &&
        data.length > 0 &&
        data.map((item, index) => {
          return (
            <div className="data-history">
              Lần {item.id}: {item.quizHistory.name}, Tổng số câu hỏi{" "}
              {item.total_questions} - Số câu trả lời đúng {item.total_correct}
            </div>
          );
        })}
    </div>
  );
};

export default History;
