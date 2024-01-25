import adminModul from "../schemas/admin.schema.js";

class admin {
  async select(id, filter, option) {
    try {
      if (id) return await adminModul.findById(id, option);
      return await adminModul.find(filter, option);
    } catch (error) {
      return error.message;
    }
  }
  async insert(body) {
    try {
      return await adminModul.create(body);
    } catch (error) {
      return error.message;
    }
  }
  async delete(id) {
    const filter = { _id: id };
    return await adminModul.deleteOne(filter);
  }
  async put(id, upt) {
    try {
      const filter = { _id: id };
      let doc = await adminModul.findOneAndUpdate(filter, upt);
      return doc;
    } catch (error) {
      return error.message;
    }
  }
}

export default new admin();
