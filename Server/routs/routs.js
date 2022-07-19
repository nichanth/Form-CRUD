const express = require("express");

const router = express.Router();

const bcrypt = require("bcrypt");

const signUpTemplateCopy = require("../models/SignUpModels");

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
      response.json(data);
    })
    .catch((err) => {
      response.json(err);
    });
});

module.exports = router;
