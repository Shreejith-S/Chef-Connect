import React from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
const Footer = () => {
  return (
    <Box className="footer">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                opacity: "0.7",
                fontFamily: "Open Sans, sans-serif",
                letterSpacing: "0.1px",
              }}
              gutterBottom
            >
              About us
            </Typography>
            <Typography variant="body2" sx={{ opacity: "70%", color: "white" }}>
              Discover a new way to enjoy restaurant-quality dining in the
              comfort of your home with ChefConnect.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                opacity: "0.7",
                fontFamily: "Open Sans, sans-serif",
                letterSpacing: "0.1px",
              }}
              gutterBottom
            >
              Get in Touch
            </Typography>
            <Typography variant="body2" sx={{ opacity: "70%", color: "white" }}>
              Mangalore, Karnataka
              <br />
              <Link to="mailto:chefConnect@gmail.com" className="footer-link">
                chefConnect@gmail.com
              </Link>
              <br />
              +00 111 222 3333
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                opacity: "0.7",
                fontFamily: "Open Sans, sans-serif",
                letterSpacing: "0.1px",
              }}
              gutterBottom
            >
              Quick Links
            </Typography>
            <Box sx={{ opacity: "70%", color: "white" }}>
              <Link to={"/"} className="footer-link">
                <ChevronRightIcon /> Home
              </Link>
              <Link to={"/About"} className="footer-link">
                <ChevronRightIcon /> About
              </Link>
              <Link to={"/Chefs"} className="footer-link">
                <ChevronRightIcon /> Chefs
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box textAlign="center" mt={4}>
          <Typography variant="body2" sx={{ opacity: "70%", color: "white" }}>
            &copy; 2024 - chefConnect, All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
