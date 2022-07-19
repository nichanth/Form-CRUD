import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

const LoginForm = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // setting up input values

  const changeFirstName = (event) => {
    setUser({ ...user, firstname: event.target.value });
  };
  const changeLastName = (event) => {
    setUser({ ...user, lastname: event.target.value });
  };
  const changeEmail = (event) => {
    setUser({ ...user, email: event.target.value });
  };
  const changePassword = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  // handleling submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const registered = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
    };
    // console.log(registered);
    axios
      .post("http://localhost:3500/app/signUp", registered, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
    setErrors(validation(user));
    setUser({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
  };
  // vallidating form

  const validation = (user) => {
    let errors = {};
    if (!user.firstname) {
      errors.firstname = "Firstname is required";
    }
    if (!user.lastname) {
      errors.lastname = "Lastname is required";
    }
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
              placeholder="firstname"
              onChange={changeFirstName}
              value={user.firstname}
              className="form-control form-group"
            />
            {errors.firstname && (
              <p style={{ color: "red" }}>{errors.firstname}</p>
            )}
            <input
              type="text"
              placeholder="lastname"
              onChange={changeLastName}
              value={user.lastname}
              className="form-control form-group"
            />
            {errors.lastname && (
              <p style={{ color: "red" }}>{errors.lastname}</p>
            )}
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
          <a href="/Persons">
            <button className="btn btn-info btn-block"> view Data</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
