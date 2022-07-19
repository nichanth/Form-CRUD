import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDeleteForever, MdPreview, MdEdit } from "react-icons/md";

const Persons = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios.get("http://localhost:3500/app/data").then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  };
  //  delete item
  const deleteItem = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:3500/app/${id}`)
      .then(() => getData())
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <table class="table table-bordered table-responsive">
        <thead>
          <tr>
            <th scope="col">S.no</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>

            <th scope="col">Date</th>
            <th scope="col">Operations</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{d.firstname + d.lastname}</td>
              <td>{d.email}</td>
              <td>{d.date}</td>
              <td>
                <MdDeleteForever
                  onClick={() => deleteItem(d._id)}
                  style={{ margin: "0 5px" }}
                />

                <Link to={`/View/${d._id}`}>
                  <MdPreview style={{ margin: "0 5px" }} />
                </Link>
                <Link to={`/EditUser/${d._id}`}>
                  <MdEdit style={{ margin: "0 5px" }} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Persons;
