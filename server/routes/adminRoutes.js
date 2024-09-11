const express = require("express");
const router = express.Router();
const multer = require("multer");
const { VerifyAdminToken } = require("../middleware/authAdmin");
const {
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
} = require("../controllers/adminController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/admin");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();

    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/Register", Register);
router.post("/Login", Login);
router.get("/getProfile", VerifyAdminToken, getProfile);
router.get("/getAllCustomers", VerifyAdminToken, getAllCustomers);
// router.get("/getFeedbacks", VerifyAdminToken, getFeedbacks);
router.put("/updateCustomerStatus/:id", VerifyAdminToken, updateCustomerStatus);
router.put(
  "/updateProfilePicture",
  VerifyAdminToken,
  upload.single("profile"),
  updateProfilePicture
);

router.put(
  "/updateProfile",
  VerifyAdminToken,
  upload.single("profile"),
  updateProfile
);

//chefs
router.post(
  "/insertNewChef",
  VerifyAdminToken,
  upload.single("profile"),
  insertNewChef
);
router.get("/getAllChefs", VerifyAdminToken, getAllChefs);
router.get("/getSingleChef/:id", VerifyAdminToken, getSingleChef);
router.put(
  "/updateChef/:id",
  VerifyAdminToken,
  upload.single("profile"),
  updateChef
);
router.delete("/deleteChef/:id", VerifyAdminToken, deleteChef);

//cuisine
router.post(
  "/insertNewCuisine",
  upload.single("picture"),
  VerifyAdminToken,
  insertNewCuisine
);
router.get("/getAllCUisines", VerifyAdminToken, getAllCUisines);
router.get("/getSingleCuisine/:id", VerifyAdminToken, getSingleCuisine);
router.delete("/deleteCuisine/:id", VerifyAdminToken, deleteCuisine);

router.get("/getChefBasedOnMealType", VerifyAdminToken, getChefBasedOnMealType);
router.get("/getAllBookings", VerifyAdminToken, getAllBookings);
router.put("/updateBooking/:id", VerifyAdminToken, updateBooking);
router.put(
  "/updatePaymentForBooking/:id",
  VerifyAdminToken,
  updatePaymentForBooking
);
//report
router.get("/getCounts", VerifyAdminToken, getCounts);
module.exports = router;
