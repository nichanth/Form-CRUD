const express = require("express");

const router = express.Router();

const bcrypt = require("bcrypt");

const signUpTemplateCopy = require("../models/SignUpModels");

const jwt = require("jsonwebtoken");
const { compare } = require("bcrypt");

// const { response } = require("express");

// get request
router.get("/data", (request, response) => {
  signUpTemplateCopy
    .find()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// login get
router.get("/datalogin", auth, (request, response) => {
  signUpTemplateCopy
    .find()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});
function auth(req, res, next) {
  const token = req.headers["authorization"];
  console.log(token);
  if (token) {
    const decode = jwt.verify(token, "My CRUD secret key 12345");
    console.log(decode);
    next();
  } else {
    res.status(401).send({ error: "Unauthorised" });
  }
}

// delete request
router.delete("/:id", (request, response) => {
  signUpTemplateCopy
    .remove({ _id: request.params.id })
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// view request
router.get("/:id", (request, response) => {
  signUpTemplateCopy
    .findOne({ _id: request.params.id })
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
// put request
router.put("/:id", (request, response) => {
  signUpTemplateCopy
    .findOneAndUpdate(
      { _id: request.params.id },
      {
        $set: {
          firstname: request.body.firstname,
          lastname: request.body.lastname,
          email: request.body.email,
        },
      },
      {
        new: true,
      }
    )

    .then((data) => {
      response.status(200).json({
        updated_product: data,
      });
      response.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// post request

router.post("/signUp", async (request, response) => {
  const saltedPassword = await bcrypt.genSalt(10);
  const securedPassword = await bcrypt.hash(
    request.body.password,
    saltedPassword
  );

  const signedUpUser = new signUpTemplateCopy({
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    email: request.body.email,
    password: securedPassword,
  });

  signedUpUser
    .save()
    .then((data) => {
      console.log(data);
      response.json(data);
    })
    .catch((err) => {
      response.json(err);
    });
});

// Login
router.post("/Login", async (request, response) => {
  try {
    const { email, password } = request.body;
    let user = await signUpTemplateCopy.findOne({ email });
    console.log(user, "jhu");

    if (user) {
      const auth = await compare(password, user.password);
      if (auth) {
        const token = jwt.sign(
          {
            email: user.email,
            password: user.password,
          },
          "My CRUD secret key 12345"
        );
        // console.log(token);
        response.json({ token });
      } else {
        console.log("kjj");
        return response.status(401).send({ error: "password wrong" });
      }
    } else {
      return response.status(404).send({ error: "Not found" });
    }
  } catch (err) {
    response.status(500).send({ error: err.message });
  }
});

module.exports = router;
