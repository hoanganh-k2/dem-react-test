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
      setData(res?.DT?.data || []);
    }
  };

  return (
    <div className="history-container">
      {data &&
        data.length > 0 &&
        data.map((item) => {
          return (
            <div className="data-history" key={item.id}>
              Lan {item.id}: {item.quizHistory.name}, tong so cau hoi{" "}
              {item.total_questions} - so cau tra loi dung {item.total_correct}
            </div>
          );
        })}
    </div>
  );
};

export default History;
