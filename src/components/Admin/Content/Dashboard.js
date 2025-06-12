import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./DashBoard.scss";
import { getOverview } from "../../../services/apiService";
import { useEffect, useState } from "react";

const Dashboard = (props) => {
  const [dataOverview, setDataOverview] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    let res = await getOverview();
    if (res && res.EC === 0) {
      setDataOverview(res.DT);
      const Qz = res?.DT?.others?.countQuiz ?? 0;
      const Qu = res?.DT?.others?.countQuestions ?? 0;
      const An = res?.DT?.others?.countAnswers ?? 0;
      const data = [
        {
          name: "Page A",
          Qz,
        },
        {
          name: "Page B",
          Qu,
        },
        {
          name: "Page C",
          An,
        },
      ];
      setDataChart(data);
    }
  };

  console.log(dataOverview);
  return (
    <div className="dashboard-container">
      <div className="title">Analytics Dashboard</div>

      <div className="content">
        <div className="c-left">
          <div className="child">
            <span className="text-1">Total users</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.users &&
              dataOverview.users.countUsers ? (
                <>{dataOverview.users.countUsers}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total quizzes</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countQuiz ? (
                <>{dataOverview.others.countQuiz}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total questions</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countQuestions ? (
                <>{dataOverview.others.countQuestions}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total answers</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countAnswers ? (
                <>{dataOverview.others.countAnswers}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
        </div>
        <div className="c-right">
          <ResponsiveContainer width="95%" height={"100%"}>
            <BarChart width={400} height={300} data={dataChart}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              {/* <YAxis /> */}
              <Tooltip />
              <Legend />
              <Bar dataKey="Qz" fill="#8884d8" />
              <Bar dataKey="Qu" fill="#82ca9d" />
              <Bar dataKey="An" fill="#ffc107" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
