import users from "../models/users.models.js";
import { SIGN, VERIFY } from "../util/jwt.js";

export const POST = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ((email, password)) {
      let data = await users.select();
      let t = data.filter((e) => e.Email == email);
      let p = t.filter((e) => e.Password == password);
      if (t.length !== 0) {
        if (p.length !== 0) {
          let token = SIGN(t[0].Email);
          res.send({ status: 202, message: "succes", Token: token });
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
        message: "Kechirasiz hamma ma'lumotni to'liq to'ldiring",
      });
    }
  } catch (error) {
    res.send({ status: 404, message: error.message });
  }
};
