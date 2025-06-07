import "./App.scss";
import Headers from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Headers />
      </div>
      <div className="main-container">
        <div className="sidenav-container"></div>
        <div className="app-content">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default App;
