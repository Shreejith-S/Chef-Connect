import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../App.css";
import { CustomerContext } from "../Context/Context";
import { useContext } from "react";

export default function Register() {
  const { customerRegister } = useContext(CustomerContext);
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = () => {
    let valid = true;
    let newErrors = { name: "", phone: "", email: "", password: "" };

    if (!userInfo.name) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!userInfo.phone) {
      newErrors.phone = "Contact number is required";
      valid = false;
    } else if (!validatePhone(userInfo.phone)) {
      newErrors.phone = "Contact number must be exactly 10 digits";
      valid = false;
    }
    if (!userInfo.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(userInfo.email)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }
    if (!userInfo.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (!validatePassword(userInfo.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      customerRegister(userInfo);
    }
  };

  return (
    <Box className="mainLogin">
      <Box className="shadeLogin">
        <Box className="containerLogin">
          <Box className="containerLeftLogin"></Box>
          <Box className="containerRightLogin">
            <Box className="loginFormContainer">
              <Box className="formHeader">
                <Typography variant="h5" className="formHeading">
                  Customer SignUp
                </Typography>
              </Box>
              <Box className="formContainer">
                <Box className="formInputContainer">
                  <TextField
                    onChange={handleChange}
                    label="Enter your name"
                    fullWidth
                    name="name"
                    variant="standard"
                    autoFocus
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Box>
                <Box className="formInputContainer">
                  <TextField
                    onChange={handleChange}
                    label="Enter your contact number"
                    fullWidth
                    name="phone"
                    variant="standard"
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                </Box>
                <Box className="formInputContainer">
                  <TextField
                    onChange={handleChange}
                    label="Enter email Id"
                    fullWidth
                    name="email"
                    variant="standard"
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Box>
                <Box className="formInputContainer">
                  <TextField
                    onChange={handleChange}
                    label="Enter password"
                    fullWidth
                    name="password"
                    type="password"
                    variant="standard"
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                </Box>
                <Box className="formInputContainer">
                  <Button
                    variant="contained"
                    fullWidth
                    className="signInButton"
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </Button>
                </Box>
                <Box className="formInputContainer">
                  <p className="loginLink">
                    Already have an account?
                    <Link to="/Login" className="clickLink">
                      {" "}
                      Sign In
                    </Link>
                  </p>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
