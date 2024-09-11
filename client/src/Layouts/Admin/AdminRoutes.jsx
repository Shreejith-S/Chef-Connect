import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Context from "./Context/Context";
import { Box, CssBaseline, styled } from "@mui/material";
import NavBar from "./Components/NavBar/NavBar";
import Profile from "./Pages/Profile";
import { useContext } from "react";
import { useEffect } from "react";
import Customers from "./Pages/Customers";
import Chefs from "./Pages/Chefs";
import Cuisines from "./Pages/Cuisines";
import Bookings from "./Pages/Bookings";
import InsertChef from "./Pages/InsertChef";
import EditChef from "./Pages/EditChef";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function AdminRoutes() {
  const { pathname } = useLocation();
  return (
    <Context>
      <Box sx={{ display: "flex" }}>
        {pathname != "/admin/" && <CssBaseline />}
        {pathname != "/admin/" && <NavBar />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: pathname != "/admin/" && 1,
            backgroundColor: "#00000008",
            minHeight: "100vh",
          }}
        >
          {pathname != "/admin/" && <DrawerHeader />}
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/Profile" element={<Profile />} />
            <Route exact path="/Customers" element={<Customers />} />
            <Route exact path="/Chefs" element={<Chefs />} />
            <Route exact path="/InsertNewChef" element={<InsertChef />} />
            <Route exact path="/editChef/:id" element={<EditChef />} />
            <Route exact path="/Cuisines" element={<Cuisines />} />
            <Route exact path="/Bookings" element={<Bookings />} />
          </Routes>
        </Box>
      </Box>
    </Context>
  );
}
