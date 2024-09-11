import React, { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Context from "./Context/Context";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Box from "@mui/material/Box";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import About from "./Pages/About";
import Chefs from "./Pages/Chefs";
import Profile from "./Pages/Profile";
import Book from "./Pages/Book";
import MyBookings from "./Pages/MyBookings";
import { useEffect } from "react";

export default function CustomerRoutes() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smooth scrolling
    });
  }, [pathname]);

  return (
    <Context>
      {pathname != "/Login" && pathname != "/Register" && (
        <Box>
          <NavBar />
        </Box>
      )}
      <Box sx={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Chefs" element={<Chefs />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Book" element={<Book />} />
          <Route path="/Bookings" element={<MyBookings />} />
        </Routes>
      </Box>
      {pathname != "/Login" && pathname != "/Register" && (
        <Box>
          <Footer />
        </Box>
      )}
    </Context>
  );
}
