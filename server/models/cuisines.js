const mongoose = require("mongoose");

const { Schema } = mongoose;

const cuisineSchema = new Schema(
  {
    title: String,
    picture: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("cuisine", cuisineSchema);
