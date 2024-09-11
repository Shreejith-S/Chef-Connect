const express = require("express");
const connectMongoDb = require("./db");
const cors = require("cors");
connectMongoDb();
const app = express();
app.use(express.json());
app.use(cors());
//customer
app.use("/customer", require("./routes/customerRoutes"));
app.use("/uploads/customer", express.static("./uploads/customer"));
app.use("/uploads/customer/getImage", express.static("./uploads/admin"));

//admin
app.use("/admin", require("./routes/adminRoutes"));
app.use("/uploads/admin", express.static("./uploads/admin"));
app.use("/uploads/admin/getImage", express.static("./uploads/customer"));

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
