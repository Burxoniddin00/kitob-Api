import { Schema, model, Types } from "mongoose";

const UsersBooks = new Schema(
  {
    booksName: {
      type: String,
      require: true,
    },
    booksPage: {
      type: String,
      require: true,
    },
    booksComment: {
      type: String,
      require: true,
    },
    usersId: {
      type: Types.ObjectId,
      require: true,
      ref: "users",
      key: "_id",
    },
  },
  {
    timestamps: {
      updatedAt: "come_date",
      createdAt: "created_at",
    },
  }
);

export default model("usersBooks", UsersBooks);
