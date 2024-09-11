import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../App.css";
import { useContext } from "react";
import { CustomerContext } from "../Context/Context";

export default function Login() {
  const { customerLogin } = useContext(CustomerContext);
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!userInfo.email) {
      newErrors.email = "Email is required";
      valid = false;
    }
    if (!userInfo.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      customerLogin(userInfo);
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
                  Customer Sign In
                </Typography>
              </Box>
              <Box className="formContainer">
                <Box className="formInputContainer">
                  <TextField
                    onChange={handleChange}
                    label="Enter email Id"
                    fullWidth
                    name="email"
                    variant="standard"
                    autoFocus
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
                    Sign In
                  </Button>
                </Box>
                <Box className="formInputContainer">
                  <p className="loginLink">
                    Don't have an account?
                    <Link to="/Register" className="clickLink">
                      {" "}
                      Sign Up
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
