import { Schema, model } from "mongoose";

const admin = new Schema(
  {
    Phone: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    Name: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      updatedAt: "come_date",
      createdAt: "created_at",
    },
  }
);

const adminModul = model("admin", admin);

export default adminModul;
