const feedbackSchema = require("../models/Feedbacks");
const adminSchema = require("../models/admin");
const customerSchema = require("../models/Customer");
const chefSchema = require("../models/chef");
const cuisineSchema = require("../models/cuisines");
const bookingSchema = require("../models/booking");

const secretKey = "chefConnect";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const check = await adminSchema.findOne({ email });
    if (check) {
      res.json({ success: false, message: "Email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = await new adminSchema({
        username,
        email,
        password: hashedPassword,
      }).save();
      res.json({ success: true, message: "Registered successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminSchema.findOne({ email });
    if (!admin) {
      console.log("Email not found");
      res.json({ success: false, message: "Invalid credential!" });
    } else {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        console.log("Password is incorrect");
        res.json({ success: false, message: "Invalid credential!" });
      } else {
        const token = jwt.sign(admin.id, secretKey);
        res.json({ success: true, message: "Login successfully", token });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getProfile = async (req, res) => {
  try {
    const admin = await adminSchema.findById(req.admin);
    if (!admin) {
      console.log("Admin not found");
      res.json({ success: false, message: "Admin not found" });
    } else {
      res.json({
        success: true,
        message: "Profile fetched successfully",
        admin,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerSchema.find();
    res.json({ success: true, customers });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updateCustomerStatus = async (req, res) => {
  try {
    var customer = await customerSchema.findById(req.params.id);
    if (!customer) {
      console.log("Customer not found");
      res.json({ success: false, message: "Customer not found" });
    } else {
      const { status } = req.body;
      const updatedCustomer = {};
      if (status) {
        updatedCustomer.status = status;
      }
      customer = await customerSchema.findByIdAndUpdate(
        req.params.id,
        { $set: updatedCustomer },
        { new: true }
      );
      var message = "";
      var color = "";
      if (status == "Active") {
        message = "Customer unblocked successfully";
        color = "success";
      } else {
        message = "Customer blocked successfully";
        color = "error";
      }
      res.json({ success: true, message, customer, color });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updateProfilePicture = async (req, res) => {
  try {
    var admin = await adminSchema.findById(req.admin);
    if (!admin) {
      console.log("Admin not found");
      res.json({ success: false, message: "Admin not found" });
    } else {
      const profile = req?.file?.filename;
      const updatedAdmin = {};
      if (profile) {
        updatedAdmin.profile = profile;
      }
      admin = await adminSchema.findByIdAndUpdate(
        req.admin,
        { $set: updatedAdmin },
        { new: true }
      );
      res.json({
        success: true,
        admin,
        message: "Profile picture updated successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updateProfile = async (req, res) => {
  try {
    var admin = await adminSchema.findById(req.admin);
    if (!admin) {
      console.log("Admin not found");
      res.json({ success: false, message: "Admin not found" });
    } else {
      const { name, password, email, phone } = req.body;
      const profile = req?.file?.filename;
      const updatedAdmin = {};

      if (name) {
        updatedAdmin.name = name;
      }
      if (phone) {
        updatedAdmin.phone = phone;
      }
      if (email) {
        updatedAdmin.email = email;
      }
      if (profile) {
        updatedAdmin.profile = profile;
      }
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedAdmin.password = hashedPassword;
      }
      admin = await adminSchema.findByIdAndUpdate(
        req.admin,
        { $set: updatedAdmin },
        { new: true }
      );
      res.json({
        success: true,
        admin,
        message: "Profile updated successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const insertNewChef = async (req, res) => {
  try {
    const { name, phone, email, place, foodType, cuisine_id } = req.body;
    const profile = req?.file?.filename;
    const check = await chefSchema.findOne({ name, email });
    if (check) {
      res.json({ success: false, message: "Chef already exists!" });
    } else {
      const newChef = await new chefSchema({
        name,
        phone,
        email,
        place,
        foodType,
        cuisine_id: cuisine_id.split(","),
        profile,
        status: "Active",
      }).save();
      res.json({
        success: true,
        message: "Chef info inserted successfully",
        newChef,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const getAllChefs = async (req, res) => {
  try {
    const chefs = await chefSchema.find().populate("cuisine_id");
    res.json({ success: true, chefs });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getSingleChef = async (req, res) => {
  try {
    const chef = await chefSchema.findById(req.params.id);
    if (!chef) {
      res.json({ success: false, message: "Chef not found!" });
    } else {
      res.json({ success: true, chef });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const updateChef = async (req, res) => {
  try {
    var chef = await chefSchema.findById(req.params.id);
    if (!chef) {
      res.json({ success: false, message: "Chef not found!" });
    } else {
      const { name, phone, place, foodType, cuisine_id, status } = req.body;
      const profile = req?.file?.filename;
      const updatedChef = {};
      if (name) updatedChef.name = name;
      if (phone) updatedChef.phone = phone;
      if (place) updatedChef.place = place;
      if (foodType) updatedChef.foodType = foodType;
      if (cuisine_id) updatedChef.cuisine_id = cuisine_id.split(",");
      if (profile) updatedChef.profile = profile;
      if (status) updatedChef.status = status;
      chef = await chefSchema.findByIdAndUpdate(
        req.params.id,
        { $set: updatedChef },
        { new: true }
      );
      res.json({ success: true, message: "Chef updated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const deleteChef = async (req, res) => {
  try {
    const chef = await chefSchema.findById(req.params.id);
    if (!chef) {
      res.json({ success: false, message: "Chef not found!" });
    } else {
      await chefSchema.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: "Chef deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const insertNewCuisine = async (req, res) => {
  try {
    const { title } = req.body;
    const picture = req?.file?.filename;
    const check = await cuisineSchema.findOne({ title });
    if (check) {
      res.json({ success: false, message: "Cuisine already exists!" });
    } else {
      const newCuisine = new cuisineSchema({
        title,
        picture,
      }).save();
      res.json({
        success: true,
        message: "Cuisine info inserted successfully",
        newCuisine,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const getAllCUisines = async (req, res) => {
  try {
    const cuisines = await cuisineSchema.find();
    res.json({ success: true, cuisines });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const getSingleCuisine = async (req, res) => {
  try {
    const cuisine = await cuisineSchema.findById(req.params.id);
    if (!cuisine) {
      res.json({ success: false, message: "Cuisine not found!" });
    } else {
      res.json({ success: true, cuisine });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const deleteCuisine = async (req, res) => {
  try {
    const cuisine = await cuisineSchema.findById(req.params.id);
    if (!cuisine) {
      res.json({ success: false, message: "Cuisine not found!" });
    } else {
      await cuisineSchema.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: "Cuisine deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getCounts = async (req, res) => {
  try {
    const chefCount = await chefSchema.find({ status: "Active" });
    const cuisineCount = await cuisineSchema.find();
    const customerCount = await customerSchema.find();
    const filtered = customerCount.filter((item) => item?.status != "Blocked");
    res.json({
      success: true,
      cuisineCount: cuisineCount.length,
      customerCount: filtered.length,
      chefCount: chefCount.length,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const getChefBasedOnMealType = async (req, res) => {
  try {
    const vegChefs = await chefSchema.find({ foodType: "Veg" });
    const nonVegChefs = await chefSchema.find({ foodType: "Non-Veg" });
    const flexChefs = await chefSchema.find({ foodType: "Both" });
    res.json({
      success: true,
      vegChefs: vegChefs.length,
      nonVegChefs: nonVegChefs.length,
      flexChefs: flexChefs.length,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingSchema
      .find()
      .populate("customer_id")
      .populate("cuisine_id")
      .populate("chef_id");
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updateBooking = async (req, res) => {
  try {
    var booking = await bookingSchema.findById(req.params.id);
    if (!booking) {
      res.json({ success: false, message: "Booking not found!" });
    } else {
      const { status, chefs, response, charge } = req.body;
      const updatedBooking = {};
      if (status) {
        updatedBooking.status = status;
      }
      if (chefs) {
        updatedBooking.chef_id = chefs;
      }
      if (charge) {
        updatedBooking.charge = charge;
      }
      if (response) {
        updatedBooking.response = response;
      }
      booking = await bookingSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: updatedBooking,
        },
        { new: true }
      );
      res.json({ success: true, message: "Booking updated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updatePaymentForBooking = async (req, res) => {
  try {
    var booking = await bookingSchema.findById(req.params.id);
    if (!booking) {
      res.json({ success: false, message: "Booking not found!" });
    } else {
      const { paymentStatus } = req.body;
      const updatedBooking = {};
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
      res.json({
        success: true,
        message: "Payment status updated successfully",
      });
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
  getAllCustomers,
  // getFeedbacks,
  updateCustomerStatus,
  updateProfilePicture,
  updateProfile,
  insertNewChef,
  getAllChefs,
  getSingleChef,
  updateChef,
  deleteChef,
  getCounts,
  insertNewCuisine,
  getAllCUisines,
  getSingleCuisine,
  deleteCuisine,
  getChefBasedOnMealType,
  getAllBookings,
  updateBooking,
  updatePaymentForBooking,
};
