import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState, useEffect } from "react";

const Sucess = () => {
  const [name, setName] = useState([
    {
      firstname: "",
      lastname: "",
      email: "",
    },
  ]);
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    viewPerson();
  }, []);

  const viewPerson = () => {
    axios
      .get("http://localhost:3500/app/datalogin", config)
      .then(async (res) => {
        await setName(res.data);

        console.log(name);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div>
      <h2>Welcome to the page</h2>
      <h1>You are suceesfully logged in</h1>
      <table class="table table-bordered table-responsive">
        <thead>
          <tr>
            <th scope="col">S.no</th>
            <th scope="col">Firstname</th>
            <th scope="col">lastname</th>

            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {name.map((d, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{d.firstname}</td>
              <td>{d.lastname}</td> bbbbbbbbb
              <td>{d.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <a href="/">
        <button className="btn btn-info btn-block">Get Back</button>
      </a>
    </div>
  );
};

export default Sucess;

// router.post("/Login", async (request, response) => {
//   const { email } = request.body;
//   const user = await signUpTemplateCopy.findOne({ email });

// if (user) {
//   const token = jwt.sign(
//     {
//       email: user.email,
//       password: user.password,
//     },
//     "My CRUD secret key 12345"
//   );
//   console.log(token);
//   response.json({ token });
// }

// if (user) {
//   return response.json({ status: "ok", user: token });
// } else {
//   return response.json({ status: "error", user: false });
// }
// if (user) {
//   const auth = await compare(password);
//   if (auth) {
//     return user;
//   }
//   throw Error("incorrect password");
// }
// response.status(500).send({ error: "email is invalid" });
// });
