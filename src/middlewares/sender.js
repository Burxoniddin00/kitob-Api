import user from "../models/users.models.js";
import { VERIFY } from "../util/jwt.js";
import admin from "../models/admin.models.js";

export async function ChekToken(req, res, next) {
  try {
    let { token } = req.headers;
    if (token) {
      let tok = VERIFY(token);
      if (tok.token) {
        let users = await user.select(null, { Email: tok.token });
        let admins = await admin.select(null, { Email: tok.token });
        if (users.length !== 0 || admins.length !== 0) {
          return next();
        } else {
          res.send({ status: 404, message: "not", users: null });
        }
      } else {
        return res.send({ status: 404, message: "Siz Logindan o'tib keling" });
      }
    } else
      return res.send({ status: 404, message: "Siz Logindan o'tib keling" });
  } catch (error) {
    return res.send({ status: 404, message: error.message });
  }
}
