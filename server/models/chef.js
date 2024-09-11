const mongoose = require("mongoose");

const chefSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    profile: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    place: {
      type: String,
      require: true,
    },
    foodType: {
      type: String,
      require: true,
    },
    ratings: [
      {
        customer_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "customer",
        },
        rating: String,
      }
    ],
    cuisine_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cuisine",
        required: true,
      },
    ],
    status: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("chef", chefSchema);
