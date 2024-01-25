import Users from "../models/users.models.js";
import { SIGN, VERIFY } from "../util/jwt.js";

export const GET = (req, res) => {
  try {
    res.send("ok");
  } catch (error) {
    res.send({ status: 404, message: error.message });
  }
};

export const POST = async (req, res) => {
  try {
    const { name, lastName, email, phone, password } = req.body;
    if (name && lastName && email && phone && password) {
      let use = await Users.select();
      let data =  use.filter((e) => e.Email == email);
      if (data.length === 0) {
        let obj = {
          Name: name,
          LastName: lastName,
          Email: email,
          Phone: phone,
          Password: password,
        };
        const newUser = await Users.insert(obj);
        let token = SIGN(email);
        res.send({
          status: 201,
          message: "success",
          Token: token,
          data: newUser,
        });
      } else {
        res.send({
          status: 404,
          message: "Kechirasiz, siz bu emaildan oldin ro'yhatdan o'tdingiz.",
        });
      }
    } else {
      res.send({ status: 404, message: "Ma'lumotlarni to'liq to'ldring." });
    }
  } catch (error) {
    res.send({ status: 404, message: error.message });
  }
};
