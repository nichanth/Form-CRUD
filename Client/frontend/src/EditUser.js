import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const EditUser = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const [editUser, setEditUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const handleChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    editPerson();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3500/app/${id}`, editUser);
    navigate("/Persons");
  };

  const editPerson = async () => {
    const result = await axios.get(`http://localhost:3500/app/${id}`);
    setEditUser(result.data);
    setEditUser(" ");
  };

  return (
    <div className="form-div">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="firstname"
          name="firstname"
          onChange={handleChange}
          value={editUser.firstname}
          className="form-control form-group"
        />
        <input
          type="text"
          placeholder="lastname"
          name="lastname"
          onChange={handleChange}
          value={editUser.lastname}
          className="form-control form-group"
        />
        <input
          type="text"
          placeholder="email"
          name="email"
          onChange={handleChange}
          value={editUser.email}
          className="form-control form-group"
        />
        <input type="submit" className="btn btn-danger btn-block" />
      </form>
    </div>
  );
};

export default EditUser;
