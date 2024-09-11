const express = require("express");
const router = express.Router();
const {
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
  giveFeedbackForBooking,RateChef,
} = require("../controllers/customerController");
const { VerifyCustomerToken } = require("../middleware/authCustomer");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/customer");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();

    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/sendFeedback", sendFeedback);
router.post("/Register", Register);
router.post("/Login", Login);
router.get("/getProfile", VerifyCustomerToken, getProfile);
router.put(
  "/updateProfile",
  VerifyCustomerToken,
  upload.single("profile"),
  updateProfile
);
//workout
router.get("/viewAllCuisines", VerifyCustomerToken, viewAllCuisines);
//meal
router.get("/viewAllChefs", viewAllChefs);
//book
router.post("/book", VerifyCustomerToken, book);
router.get("/getMyBookings", VerifyCustomerToken, getMyBookings);
router.put("/cancelMyBooking/:id", VerifyCustomerToken, cancelMyBooking);
router.put("/payForBooking/:id", VerifyCustomerToken, payForBooking);
router.put(
  "/giveFeedbackForBooking/:id",
  VerifyCustomerToken,
  giveFeedbackForBooking
);
router.put(
  "/RateChef/:id",
  VerifyCustomerToken,
  RateChef
);
module.exports = router;
