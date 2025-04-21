import "./App.scss";
import Headers from "./components/Header/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Headers />
      </div>
      <div className="main-container">
        <div className="sidenav-container"></div>
        <div className="app-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
