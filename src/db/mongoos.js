import mongoose from "mongoose";
mongoose
  .connect("mongodb://localhost:27017/Books")
  .then(console.log("connection"))
  .catch((er) => console.log(er.message));
