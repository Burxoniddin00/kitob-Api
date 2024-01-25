import dayjs from "dayjs";
import userBookse from "../models/userBookse.js";
import usersModels from "../models/users.models.js";

export const GET = async (req, res) => {
  try {
    const { id } = req.params;
    let books = await userBookse.select();
    const users = await usersModels.select();
    let arr = [];
    if (id == "today") {
      let time = new Date();
      for (let i of books) {
        if (
          dayjs(i.created_at).format("DD/MM/YYYY") ==
          dayjs(time).format("DD/MM/YYYY")
        ) {
          arr.push(i);
        }
      }
      books = arr;
      const transformedArray = users
        .map((user) => {
          const { _id, Name, LastName } = user;

          const userBooks = books.filter(
            (book) => book.usersId.toString() === _id.toString()
          );
          const booksPage = userBooks.reduce(
            (total, book) => total + parseInt(book.booksPage),
            0
          );
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString().split("T")[0];
          return {
            usersId: _id.toString(),
            Name,
            LastName,
            booksPage,
            created_at: formattedDate,
          };
        })
        .sort((a, b) => b.booksPage - a.booksPage);
      res.send({
        status: 201,
        message: "succus",
        data: transformedArray,
      });
    } else {
      let time = new Date();
      for (let i of books) {
        if (
          dayjs(i.created_at).format("MM/YYYY") == dayjs(time).format("MM/YYYY")
        ) {
          arr.push(i);
        }
      }
      books = arr;
      const transformedArray = users
        .map((user) => {
          const { _id, Name, LastName } = user;

          const userBooks = books.filter(
            (book) => book.usersId.toString() === _id.toString()
          );
          const booksPage = userBooks.reduce(
            (total, book) => total + parseInt(book.booksPage),
            0
          );
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString().split("T")[0];
          return {
            usersId: _id.toString(),
            Name,
            LastName,
            booksPage,
            created_at: formattedDate,
          };
        })
        .sort((a, b) => b.booksPage - a.booksPage);
      res.send({
        status: 201,
        message: "succus",
        data: transformedArray,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.send({ status: 505, message: error.message });
  }
};
