import users from "../schemas/userBooks.js";

class UsersBooks {
  async select(id, filter, option) {
    try {
      if (id) return await users.findById(id, option);
      return await users.find(filter, option);
    } catch (error) {
      return error.message;
    }
  }
  async insert(body) {
    try {
      return await users.create(body);
    } catch (error) {
      return error.message;
    }
  }
  async delete(id) {
    const filter = { _id: id };
    return await users.deleteOne(filter);
  }
  async put(id, upt) {
    try {
      const filter = { _id: id };
      let doc = await users.findOneAndUpdate(filter, upt);
      return doc;
    } catch (error) {
      return error.message;
    }
  }
}

export default new UsersBooks();
