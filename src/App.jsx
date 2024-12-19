import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Messenger from "./pages/messenger/Messenger";
import Settings from "./pages/settings/Settings";
import Assignment from "./pages/assignment/Assignment";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/messenger" element={<Messenger />} />
        <Route path="/assignment" element={<Assignment />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
