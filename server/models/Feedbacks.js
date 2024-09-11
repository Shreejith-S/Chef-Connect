const mongoose = require("mongoose");

const { Schema } = mongoose;

const feedbackSchema = new Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "booking",
    },
    feedback: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("feedback", feedbackSchema);
