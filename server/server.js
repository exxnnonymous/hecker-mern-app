// if (process.env.NODE_ENV.trim() === "dev") {
require("dotenv").config();
// }

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const postRoute = require("./routes/posts");
const userRoute = require("./routes/userAuth");
const usersInfoRoute = require("./routes/user");



const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res)=>{
  res.status(200).json({message:"Hi, this is hecker api"})
})
app.use("/api/post", postRoute);
app.use("/api/user", userRoute);
app.use("/api/usersinfo", usersInfoRoute);

app.get("/api/home", (req, res) => {
  res.status(200).json({ message: "server available" });
});

const CONNECTION_URL =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.md6va.mongodb.net/ExoBeastDB`;
let PORT = process.env.PORT ;
if (PORT == null || PORT == "") {
  PORT = 8000;
}

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() =>
    console.log("Database connection successful")
  )
  .catch((err) => console.log(err));


  app.listen(PORT, () => console.log(`server running ${PORT}`))