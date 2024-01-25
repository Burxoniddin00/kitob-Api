import UsersBooks from "../models/userBookse.js";
import dayjs from "dayjs";
import { VERIFY } from "../util/jwt.js";
import usersModels from "../models/users.models.js";
import users from "../models/users.models.js";
import userBookse from "../models/userBookse.js";
export const GETALL = async (req, res) => {
  try {
    let { id } = req.params;
    let { token } = req.headers;
    if (token) {
      let tok = VERIFY(token);
      if (tok.token) {
        let users = await usersModels.select(null, { Email: tok.token });
        let data = await UsersBooks.select(null, { usersId: users[0]._id });
        if (id == "today") {
          let arr = [];
          let time = new Date();
          for (let i = 0; i < data.length; i++) {
            if (
              dayjs(data[i].created_at).format("DD/MM/YYYY") ===
              dayjs(time).format("DD/MM/YYYY")
            ) {
              arr.push(data[i]);
            }
          }
          res.send({ status: 200, message: "succes", data: arr });
        } else if (id) {
          res.send({ status: 200, message: "succes", data });
        } else {
          function sortByDate(data) {
            const sortedData = [];

            data.forEach((item) => {
              const year = item.created_at.getFullYear().toString();
              const month = `${year}/${(item.created_at.getMonth() + 1)
                .toString()
                .padStart(2, "0")}`;
              const day = `${month}/${item.created_at
                .getDate()
                .toString()
                .padStart(2, "0")}`;

              let yearIndex = -1;
              let monthIndex = -1;
              let dayIndex = -1;

              for (let i = 0; i < sortedData.length; i++) {
                if (sortedData[i].year === year) {
                  yearIndex = i;
                  break;
                }
              }

              if (yearIndex === -1) {
                yearIndex = sortedData.length;
                sortedData.push({ year, monthn: [] });
              }

              for (let i = 0; i < sortedData[yearIndex].monthn.length; i++) {
                if (sortedData[yearIndex].monthn[i].month === month) {
                  monthIndex = i;
                  break;
                }
              }

              if (monthIndex === -1) {
                monthIndex = sortedData[yearIndex].monthn.length;
                sortedData[yearIndex].monthn.push({ month, day: [] });
              }

              for (
                let i = 0;
                i < sortedData[yearIndex].monthn[monthIndex].day.length;
                i++
              ) {
                if (
                  sortedData[yearIndex].monthn[monthIndex].day[i].day === day
                ) {
                  dayIndex = i;
                  break;
                }
              }

              if (dayIndex === -1) {
                dayIndex = sortedData[yearIndex].monthn[monthIndex].day.length;
                sortedData[yearIndex].monthn[monthIndex].day.push({
                  day,
                  data: [],
                });
              }

              sortedData[yearIndex].monthn[monthIndex].day[dayIndex].data.push(
                item
              );
            });

            return sortedData;
          }

          const sortedData = sortByDate(data);

          res.send({ status: 201, message: "ok", data: sortedData });
        }
      } else {
        return res.send({ status: 404, message: "Siz Logindan o'tib keling" });
      }
    } else {
      return res.send({ status: 404, message: "Siz Logindan o'tib keling" });
    }
  } catch (error) {
    res.send({ status: 404, message: error.message });
  }
};

export const POST = async (req, res) => {
  try {
    let { token } = req.headers;
    const { booksName, booksPage, booksComment } = req.body;
    if (token) {
      let tok = VERIFY(token);
      let users = await usersModels.select(null, { Email: tok.token });
      let usersId = users[0]._id;
      if (booksName && booksPage && booksComment) {
        let obj = {
          booksName,
          booksPage,
          booksComment,
          usersId,
        };
        let arr = [];
        let respon = await UsersBooks.insert(obj);

        let data = await UsersBooks.select(null, { usersId });

        let time = new Date();
        for (let i = 0; i < data.length; i++) {
          if (
            dayjs(data[i].created_at).format("DD/MM/YYYY") ==
            dayjs(time).format("DD/MM/YYYY")
          ) {
            arr.push(data[i]);
          }
        }
        res.send({
          status: 201,
          message: "Muvaffaqiyat to'ldirdingiz",
          data: arr,
        });
      } else {
        res.send({
          status: 404,
          message: "Siz hamma ma'lumotni to'ldirganingiz yo'q!🧐",
        });
      }
    } else {
      res.send({
        status: 404,
        message: "Siz Logindan o'tib keling",
      });
    }
  } catch (error) {
    res.send({ status: 404, message: error.message });
  }
};

export const PUT = async (req, res) => {
  try {
    let { token } = req.headers;
    let { id } = req.params;
    const { booksName, booksPage, booksComment } = req.body;
    let data = await UsersBooks.select();
    if (booksComment || booksName || booksPage) {
      let tok = VERIFY(token);
      let arr = [];
      let users = await usersModels.select(null, { Email: tok.token });
      let usersId = users[0]._id;
      let obj = {
        booksName: booksName || result[0].booksName,
        booksPage: booksPage || result[0].booksPage,
        booksComment: booksComment || result[0].booksComment,
      };
      let updet = await UsersBooks.put(id, obj);

      let result = data.filter((e) => e._id == id);
      let usData = await UsersBooks.select(null, { usersId });
      let time = new Date();
      for (let i = 0; i < usData.length; i++) {
        if (
          dayjs(usData[i].created_at).format("DD/MM/YYYY") ==
          dayjs(time).format("DD/MM/YYYY")
        ) {
          arr.push(usData[i]);
        }
      }
      res.send({
        status: 201,
        message: "Muvaffaqiyatli o'zgartirildi",
        data: arr,
      });
    } else {
      res.send({ status: 402, message: "O'zgartirish kiriting" });
    }
  } catch (error) {
    res.send({ status: 404, message: error.message });
  }
};

export const DELETE = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      let d = await UsersBooks.delete(id);
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
      res.send({
        status: 201,
        message: "Malumot o'chdi",
        data: updatedUsers,
      });
    } else {
      res.send({ status: 404, message: "amalga oshmadi" });
    }
  } catch (error) {
    res.send({ status: 404, message: error.message });
  }
};
