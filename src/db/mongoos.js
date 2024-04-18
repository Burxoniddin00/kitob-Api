import mongoose from "mongoose";
mongoose
  .connect("mongodb+srv://burxstvoldi:6kaADtAPMwEqBZuQ@cluster0.7inmvfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(console.log("connection"))
  .catch((er) => console.log(er.message+'555'));

  