import usersSchema from "../schemas/users.schem.js";

class Users {
  async select(id, filter, option) {
    try {
      if (id) return await usersSchema.findById(id, option);
      return await usersSchema.find(filter, option);
    } catch (error) {
      return error.message;
    }
  }
  async insert(body) {
    try {
      return await usersSchema.create(body);
    } catch (error) {
      return error.message;
    }
  }
  async delete(id) {
    const filter = { _id: id };
    return await usersSchema.deleteOne(filter);
  }
  async put(id, upt) {
    try {
      const filter = { _id: id };
      let doc = await usersSchema.findOneAndUpdate(filter, upt);
      return doc;
    } catch (error) {
      return error.message;
    }
  }
}

export default new Users();
