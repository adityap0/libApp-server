const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    genre: { type: String },
    edition: { type: String },
    author: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
