const jwt = require("jsonwebtoken");
const secretKey = "chefConnect";

const VerifyCustomerToken = async (req, res, next) => {
  let token = req.header("auth-token");
  if (!token) {
    return res.json({
      success: false,
      message: "Please authenticate using valid token",
    });
  }
  try {
    const userId = jwt.verify(token, secretKey);
    req.customer = userId;
    next();
  } catch (err) {
    return res.json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { VerifyCustomerToken };
