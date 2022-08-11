import React from "react";

import Persons from "./Persons";
import View from "./View";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditUser from "./EditUser";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Sucess from "./Sucess";

const App = () => {
  // const [response, setResponse] = useState({});
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SignupForm />}></Route>
          <Route path="/LoginForm" element={<LoginForm />}></Route>
          <Route path="/Sucess" element={<Sucess />}></Route>
          <Route path="/Persons" element={<Persons />}></Route>
          <Route path="/View/:id" element={<View />} component={View}></Route>
          <Route path="/EditUser/:id" element={<EditUser />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
