console.log("\n\n-: App Started :-");

const express = require("express");
const mongoose = require("mongoose");
const MONGODB_URI =
  "mongodb+srv://tester:tester1234@cluster0.hlicuim.mongodb.net/demat?retryWrites=true&w=majority";

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const stock = require("./routes/stockapi");
app.use(stock);

app.use("/", (req, res, next) => {
  console.log("-: Welcome :-");
  res.send("-: Welcome :-");
  next();
});

console.log("-: App Running :-");
//app.listen(3000);
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log(null);
    app.listen(3001);
  })
  .catch((err) => console.log(err));
