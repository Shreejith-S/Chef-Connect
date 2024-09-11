const mongoose = require("mongoose");

const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
    chef_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chef",
      },
    ],
    charge: String,
    name: String,
    phone: String,
    email: String,
    city: String,
    location: String,
    address: String,
    mapLink: String,
    message: String,
    vacation: String,
    meal: [],
    mealType: String,
    peopleCont: String,
    date: String,
    burnerCount: String,
    cuisine_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cuisine",
    },
    status: String,
    paymentStatus: String,
    transactionId: String,
    response: String,
    feedback: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("booking", bookingSchema);
