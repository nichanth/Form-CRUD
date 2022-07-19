import React from "react";
import LoginForm from "./LoginForm";
import Persons from "./Persons";
import View from "./View";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditUser from "./EditUser";

const App = () => {
  // const [response, setResponse] = useState({});
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />}></Route>
          <Route path="/Persons" element={<Persons />}></Route>
          <Route path="/View/:id" element={<View />} component={View}></Route>
          <Route path="/EditUser/:id" element={<EditUser />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
