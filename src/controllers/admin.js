import adminModul from "../models/admin.models.js";
import users from "../models/users.models.js";
import userBookse from "../models/userBookse.js";
import { SIGN, VERIFY } from "../util/jwt.js";

export const GET = async (req, res) => {
  try {
    let { token } = req.headers;
    let tok = VERIFY(token);
    let admin = await adminModul.select(null, { Email: tok.token });
    if (admin.length > 0) {
      res.send({ message: "ok", statsu: 201, data: admin });
    } else {
      res.send({ message: "Kechirasiz siz Admin emasiz", statsu: 404 });
    }
  } catch (error) {
    res.send({ status: 404, message: error.message });
  }
};

export const GETUSERS = async (req, res) => {
  try {
    let { token } = req.headers;
    if (token) {
      let tok = VERIFY(token);
      let admin = await adminModul.select(null, { Email: tok.token });
      if (admin) {
        let use = await users.select();
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
        res.send({ status: 201, message: "ok", data: updatedUsers });
      } else {
        res.send({ message: "not", status: 404 });
      }
    } else {
      res.send({ message: "not", status: 404 });
    }
  } catch (error) {
    res.send({ status: 404, message: error.message });
  }
};

export const POST = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ((email, password)) {
      let data = await adminModul.select();
      let t = data.filter((e) => e.Email == email);
      let p = data.filter((e) => e.Password == password);
      if (t.length !== 0) {
        if (p.length !== 0) {
          let token = SIGN(data[0].Email);
          res.send({ statsu: 202, message: "succes", Token: token });
        } else {
          res.send({
            status: 404,
            message: "Kechirasiz siz yozgan parol xato",
          });
        }
      } else {
        res.send({
          status: 404,
          message: "Kechirasiz siz bizning ro'yhatdan o'tmagansiz",
        });
      }
    } else {
      res.send({
        status: 404,
        message: "Kechirasiz siz hamma malumotni to'liq to'ldring",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ message: error.message, status: 404 });
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
        let data = await adminModul.select(id);
        if (Email || LastName || Name || Password || Phone) {
          let obj = {
            Email: Email || data.Email,
            LastName: LastName || data.LastName,
            Name: Name || data.Name,
            Password: Password || data.Password,
            Phone: Phone || data.Phone,
          };
          let edit = await adminModul.put(id, obj);
          let admin = await adminModul.select(null, { Email: tok.token });
          res.send({ message: "Muvaffaqiyat o'zgartrildi", statsu: 201, data: admin });
        } else {
          res.send({
            message: "O'zgartirish uchun malumot yuboring",
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
