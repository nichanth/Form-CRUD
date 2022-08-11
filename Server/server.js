const express = require("express");

const app = express();

const mongoose = require("mongoose");

const dotenv = require("dotenv");

const routUrls = require("./routs/routs");

const cors = require("cors");

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, () => {
  console.log("database connected");
});
app.use(express.json());
app.use(cors());
app.use(express.static("uploads"));
app.use("/app", routUrls);
app.listen(3500, () => {
  console.log("Server runs in port 3500");
});
