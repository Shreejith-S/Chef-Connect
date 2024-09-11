import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import "../../../App.css";
import loginPic from "../Assets/loginPic.svg";
import { useState } from "react";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
export default function Login() {
  const { adminLogin } = useContext(AdminContext);
  const [adminInfo, setAdminInfo] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setAdminInfo({ ...adminInfo, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!adminInfo.email) {
      newErrors.email = "Email is required";
      valid = false;
    }
    if (!adminInfo.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      adminLogin(adminInfo);
    }
  };
  return (
    <Box className="LoginPage">
      <Paper className="LoginContainer">
        <Box className="leftContainer">
          <img src={loginPic} width="90%" alt="" />
        </Box>
        <Box className="rightContainer">
          <Box sx={{ width: "100%" }}>
            <Typography
              sx={{ float: "left", fontWeight: "bolder" }}
              color="text.secondary"
              variant="h6"
            >
              Admin Login
            </Typography>
          </Box>
          <TextField
            onChange={handleChange}
            sx={{ mt: 1 }}
            label="Enter email id"
            name="email"
            fullWidth
            size="small"
            autoFocus
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            onChange={handleChange}
            sx={{ mt: 1 }}
            label="Enter password"
            name="password"
            fullWidth
            type="password"
            size="small"
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ mt: 2 }}
            fullWidth
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
