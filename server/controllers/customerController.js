const feedbackSchema = require("../models/Feedbacks");
const customerSchema = require("../models/Customer");
const cuisineSchema = require("../models/cuisines");
const chefSchema = require("../models/chef");
const bookingSchema = require("../models/booking");

const secretKey = "chefConnect";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sendFeedback = async (req, res) => {
  try {
    const { feedback, booking_id } = req.body;

    const newFeedback = await new feedbackSchema({
      feedback,
      booking_id,
      customer_id: req.customer,
    }).save();
    res.json({
      success: true,
      message: "Thank you for your valuable feedback",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error" });
  }
};

const Register = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    const check = await customerSchema.findOne({ email });
    if (check) {
      res.json({ success: false, message: "Email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newCustomer = await new customerSchema({
        name,
        phone,
        email,
        password: hashedPassword,
        status: "Active",
      }).save();
      res.json({ success: true, message: "Registered successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error" });
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await customerSchema.findOne({ email });
    if (!customer) {
      console.log("Email not found");
      res.json({ success: false, message: "Invalid credential!" });
    } else {
      const isMatch = await bcrypt.compare(password, customer.password);
      if (!isMatch) {
        console.log("Password is incorrect");
        res.json({ success: false, message: "Invalid credential!" });
      } else {
        if (customer?.status == "Blocked") {
          res.json({
            success: false,
            message: "Your account has been blocked",
          });
        } else {
          const token = jwt.sign(customer.id, secretKey);
          res.json({
            success: true,
            message: "Login successfully",
            token,
            customer,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error" });
  }
};
const getProfile = async (req, res) => {
  try {
    const customer = await customerSchema.findById(req.customer);
    if (!customer) {
      console.log("Customer not found");
      res.json({ success: false, message: "Customer not found" });
    } else {
      res.json({
        success: true,
        message: "Profile fetched successfully",
        customer,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error" });
  }
};
const updateProfile = async (req, res) => {
  try {
    var customer = await customerSchema.findById(req.customer);
    if (!customer) {
      console.log("Customer not found");
      res.json({ success: false, message: "Customer not found" });
    } else {
      const { name, phone, address, password } = req.body;
      const profile = req?.file?.filename;
      const updatedCustomer = { name, phone, address };
      if (name) {
        updatedCustomer.name = name;
      }
      if (phone) {
        updatedCustomer.phone = phone;
      }
      if (address) {
        updatedCustomer.address = address;
      }
      if (profile) {
        updatedCustomer.profile = profile;
      }
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedCustomer.password = hashedPassword;
      }
      customer = await customerSchema.findByIdAndUpdate(
        req.customer,
        updatedCustomer
      );
      res.json({
        success: true,
        message: "Profile updated successfully",
        customer,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error" });
  }
};

const viewAllCuisines = async (req, res) => {
  try {
    const cuisines = await cuisineSchema.find();
    res.json({ success: true, cuisines });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const viewAllChefs = async (req, res) => {
  try {
    const chefs = await chefSchema
      .find({ status: "Active" })
      .populate("cuisine_id");
    res.json({ success: true, chefs });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const book = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      mealType,
      cuisine_id,
      meal,
      peopleCont,
      date,
      burnerCount,
      location,
      city,
      address,
      mapLink,
      message,
    } = req.body;
    const check = await bookingSchema.findOne({
      name,
      phone,
      email,
      date,
      customer_id: req.customer,
    });
    if (check) {
      res.json({
        success: false,
        message: "You have already booked this meal!",
      });
    } else {
      const booking = new bookingSchema({
        name,
        email,
        phone,
        mealType,
        cuisine_id,
        meal,
        peopleCont,
        date,
        burnerCount,
        location,
        city,
        address,
        mapLink,
        message,
        customer_id: req.customer,
        status: "Pending",
      });
      await booking.save();
      res.json({ success: true, message: "Booking successful!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getMyBookings = async (req, res) => {
  try {
    const bookings = await bookingSchema
      .find({
        customer_id: req.customer,
      })
      .populate("cuisine_id")
      .populate("chef_id");
    if (bookings) {
      res.json({
        success: true,
        bookings,
      });
    } else {
      res.json({ success: false, message: "No bookings found!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const cancelMyBooking = async (req, res) => {
  try {
    const booking = await bookingSchema.findById(req.params.id);
    if (!booking) {
      res.json({ success: false, message: "Booking not found!" });
    } else {
      booking.status = "Cancelled";
      await booking.save();
      res.json({ success: true, message: "Booking cancelled!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const payForBooking = async (req, res) => {
  try {
    var booking = await bookingSchema.findById(req.params.id);
    if (!booking) {
      res.json({ success: false, message: "Booking not found!" });
    } else {
      const { transactionId, paymentStatus } = req.body.data;
      const updatedBooking = {};
      if (transactionId) {
        updatedBooking.transactionId = transactionId;
      }
      if (paymentStatus) {
        updatedBooking.paymentStatus = paymentStatus;
      }
      booking = await bookingSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: updatedBooking,
        },
        { new: true }
      );
      res.json({ success: true, message: "Payment initiated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const giveFeedbackForBooking = async (req, res) => {
  try {
    var booking = await bookingSchema.findById(req.params.id);
    if (!booking) {
      res.json({ success: false, message: "Booking not found!" });
    } else {
      const { feedback } = req.body;
      const updatedBooking = {};
      if (feedback) {
        updatedBooking.feedback = feedback;
      }
      booking = await bookingSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: updatedBooking,
        },
        { new: true }
      );
      res.json({ success: true, message: "Feedback submitted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const RateChef = async (req, res) => {
  try {
    var chef = await chefSchema.findById(req.params.id);
    if (!chef) {
      res.json({ success: false, message: "Chef not found!" });
    } else {
      const { rating } = req.body;
      const customer_id = req.customer;
      const updatedChef = {};
      if (rating) {
        updatedChef.ratings = [...chef.ratings, { customer_id, rating }];
      }
      chef = await chefSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: updatedChef,
        },
        { new: true }
      );
      res.json({ success: true, message: "Thank you! Rating has been stored sucessfully!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
module.exports = {
  Register,
  Login,
  getProfile,
  updateProfile,
  viewAllChefs,
  viewAllCuisines,
  sendFeedback,
  book,
  getMyBookings,
  cancelMyBooking,
  payForBooking,
  giveFeedbackForBooking,RateChef
};
