import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import logo from "../../Assets/logo/waiter.png";
import "../../../../App.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CustomerContext } from "../../Context/Context";
const pages = [
  { title: "Home", path: "/" },
  { title: "About", path: "/About" },
  { title: "Chefs", path: "/Chefs" },
];
const settings = [
  { title: "Profile", path: "/Profile" },
  { title: "Bookings", path: "/Bookings" },
];
// const pages = ["Products", "Pricing", "Blog"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const { customer, customerLogout, host } = useContext(CustomerContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [navBackground, setNavBackground] = useState("transparent");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (value) => {
    if (value == "logout") {
      setAnchorElNav(null);
      customerLogout();
    } else {
      setAnchorElNav(null);
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const changeBackground = () => {
    if (window.scrollY >= 20) {
      setNavBackground("#051922");
    } else {
      setNavBackground("transparent");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{ backgroundColor: navBackground, transition: "0.7s" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{ display: { xs: "none", md: "flex" }, mr: 1, width: "50px" }}
            >
              <img src={logo} alt="logo" style={{ width: "100%" }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: "bolder",
                color: "#e4591d",
                textDecoration: "none",
                fontSize: "30px",
                opacity: "70%",
              }}
            >
              ChefConnect
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={index}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page?.path}
                >
                  <Typography textAlign="center">{page?.title}</Typography>
                </MenuItem>
              ))}
              {customer ? (
                <Box>
                  <MenuItem
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={"/Book"}
                  >
                    <Typography textAlign="center">Book</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => handleCloseNavMenu("logout")}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Box>
              ) : (
                <MenuItem
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={"/Login"}
                >
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "0%" },
              p: { xs: 1 },
            }}
          >
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                width: "30px",
                justifyContent: "center",
              }}
            >
              <img src={logo} alt="logo" style={{ width: "100%" }} />
            </Box>
            <Typography
              variant="h5"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                color: "#e4591d",
                textDecoration: "none",
                fontSize: "20px",
                opacity: "80%",
                width: "30%",
                textAlign: "center",
              }}
            >
              ChefConnect
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "30%",
                justifyContent: "space-evenly",
              }}
            >
              {pages.map((page, index) => (
                <Link
                  className="navS"
                  component="Button"
                  to={page.path}
                  key={index}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                  }}
                >
                  {page.title}
                </Link>
              ))}
              {customer ? (
                <>
                  <Link
                    to={"/Book"}
                    className="navS"
                    component="Button"
                    sx={{
                      my: 2,
                    }}
                  >
                    Book
                  </Link>
                  <Link
                    className="navS"
                    component="Button"
                    onClick={() => handleCloseNavMenu("logout")}
                    sx={{
                      my: 2,
                    }}
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <Link
                  className="navS"
                  component="Button"
                  to={"/Login"}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                  }}
                >
                  Login
                </Link>
              )}
            </Box>
          </Box>
          {customer && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="profile"
                    src={`${host}/uploads/customer/${customer?.profile}`}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem
                    component={Link}
                    to={setting?.path}
                    key={index}
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">{setting?.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
