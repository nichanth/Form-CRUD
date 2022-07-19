import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const View = () => {
  const [singleData, setSingleData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const { id } = useParams();

  useEffect(() => {
    viewItem();
  }, []);

  const viewItem = async () => {
    const response = await axios.get(`http://localhost:3500/app/${id}`);
    setSingleData(response.data);
  };
  return (
    <div>
      <Link className="btn btn-primary" to={"/"}>
        Home
      </Link>

      <ul className="list-group w-50">
        <li className="list-group-item">Firstname:{singleData.firstname}</li>
        <li className="list-group-item">Lastname:{singleData.lastname}</li>
        <li className="list-group-item">Email:{singleData.email}</li>
      </ul>
    </div>
  );
};

export default View;
