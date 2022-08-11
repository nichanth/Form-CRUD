import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const changePage = useNavigate();
  const [errors, setErrors] = useState({});

  // setting up input values

  const changeEmail = (event) => {
    setUser({ ...user, email: event.target.value });
  };
  const changePassword = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  // handleling submission
  async function handleSubmit(event) {
    event.preventDefault();

    const registered = {
      email: user.email,
      password: user.password,
    };
    console.log(registered);
    axios
      .post("http://localhost:3500/app/Login", registered, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);

        changePage("/Sucess");
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid User");
      });

    setErrors(validation(user));
    setUser({
      email: "",
      password: "",
    });
    //
    //
    // const response = await fetch("http://localhost:3500/app/Login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   registered,
    // });

    // const data = await response.json();
    // console.log(data);
    // setErrors(validation(user));
    // setUser({
    //   email: "",
    //   password: "",
    // });
  }
  //   vallidating form

  const validation = (user) => {
    let errors = {};

    if (!user.email) {
      errors.email = "Email is required";
    }
    if (!user.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  return (
    <div>
      <div className="container">
        <div className="form-div">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="email"
              onChange={changeEmail}
              value={user.email}
              className="form-control form-group"
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            <input
              type="password"
              placeholder="password"
              onChange={changePassword}
              value={user.password}
              className="form-control form-group"
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
            <input type="submit" className="btn btn-danger btn-block" />
          </form>
          <a href="/">
            <button className="btn btn-info btn-block"> Signup</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
