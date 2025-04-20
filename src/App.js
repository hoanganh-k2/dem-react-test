import "./App.scss";
import Headers from "./components/Header/Header";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <Headers />
      <div>
        test link
        <Link to="/users">User</Link>
        <Link to="/admins">Admin</Link>
      </div>
    </div>
  );
}

export default App;
