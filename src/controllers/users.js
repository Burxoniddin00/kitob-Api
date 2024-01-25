import user from "../models/users.models.js";
import { VERIFY } from "../util/jwt.js";
import userBookse from "../models/userBookse.js";

export const GET = async (req, res) => {
  try {
    let users = await user.select();
    let { id } = req.params;
    let { token } = req.headers;
    let tok = VERIFY(token);
    let usera = await user.select(null, { Email: tok.token });
    if (usera.length != 0) {
      if (id == "my") {
        let users = await user.select(null, { Email: tok.token });
        if (users.length != 0) {
          res.send({ status: 201, message: "succes", users });
        } else {
          res.send({ status: 404, message: "not", users: null });
        }
      } else {
        res.send({ status: 201, message: "succes", users });
      }
    } else {
      res.send({ status: 404, message: "not", users: null });
    }
  } catch (error) {
    res.send({ status: 404, message: error.message });
  }
};

export const PUT = async (req, res) => {
  try {
    let { token } = req.headers;
    let { id } = req.params;
    let { Email, LastName, Name, Password, Phone } = req.body;
    let tok = VERIFY(token);
    if (token) {
      if (id) {
        let data = await user.select(id);
        if (Email || LastName || Name || Password || Phone) {
          let obj = {
            Email: Email || data.Email,
            LastName: LastName || data.LastName,
            Name: Name || data.Name,
            Password: Password || data.Password,
            Phone: Phone || data.Phone,
          };
          let edit = await user.put(id, obj);
          let admin = await user.select(null, { Email: tok.token });
          res.send({
            message: "Muvaffaqiyatli o'zgartirildi",
            status: 201,
            data: admin,
          });
        } else {
          res.send({
            message: "O'zgartirish uchun ma'lumot yuboring",
            status: 203,
          });
        }
      } else {
        res.send({ message: "id yo'q", status: 404 });
      }
    } else {
      res.send({ message: "token yo'q", status: 404 });
    }
  } catch (error) {
    res.send({ message: error.message, status: 404 });
  }
};

export const DELETE = async (req, res) => {
  try {
    let { id } = req.params;
    if (id) {
      let data = await user.select(id);
      let books = await userBookse.select(null, { usersId: id });
      if (books.length != 0) {
        for (let i of books) {
          if (i.usersId.toString() === data._id.toString()) {
            let d = await userBookse.delete(i._id);
          }
        }
        let de = await user.delete(id);
        let use = await user.select();
        let book = await userBookse.select();
        function formatDate(date) {
          return date.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        }
        function updateUsersWithBooks(users, books) {
          return users.map((user) => {
            const userBooks = books.filter((book) =>
              book.usersId.equals(user._id)
            );
            let obj = {
              _id: user._id,
              Phone: user.Phone,
              Email: user.Email,
              Name: user.Name,
              LastName: user.LastName,
              Password: user.Password,
              books: userBooks,
              created_at: formatDate(user.created_at),
              come_date: formatDate(user.come_date),
            };
            return obj;
          });
        }
        const updatedUsers = updateUsersWithBooks(use, book);
        res.send({
          status: 201,
          message: "Users o'chdi",
          data: updatedUsers,
        });
      } else {
        let de = await user.delete(id);
        let use = await user.select();
        let book = await userBookse.select();
        function formatDate(date) {
          return date.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        }
        function updateUsersWithBooks(users, books) {
          return users.map((user) => {
            const userBooks = books.filter((book) =>
              book.usersId.equals(user._id)
            );
            let obj = {
              _id: user._id,
              Phone: user.Phone,
              Email: user.Email,
              Name: user.Name,
              LastName: user.LastName,
              Password: user.Password,
              books: userBooks,
              created_at: formatDate(user.created_at),
              come_date: formatDate(user.come_date),
            };
            return obj;
          });
        }
        const updatedUsers = updateUsersWithBooks(use, book);
        res.send({
          status: 201,
          message: "Users o'chdi",
          data: updatedUsers,
        });
      }
    } else {
      res.send({ status: 404, message: "not" });
    }
  } catch (error) {
    res.send({ status: 404, message: error.message });
  }
};
