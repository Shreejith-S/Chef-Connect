import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Account from "./Account";
import { useContext } from "react";
import { AdminContext } from "../../Context/Context";
import DashboardIcon from "@mui/icons-material/SpaceDashboard";
import GroupIcon from "@mui/icons-material/Group";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import { Link } from "react-router-dom";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function NavBar() {
  const { admin, host, active, setActive } = useContext(AdminContext);
  const sideBarOptions = [
    { title: "DashBoard", icon: <DashboardIcon />, path: "/admin/DashBoard" },
    { title: "Customers", icon: <GroupIcon />, path: "/admin/Customers" },
    { title: "Chefs", icon: <ManageAccountsIcon />, path: "/admin/Chefs" },
    { title: "Cuisines", icon: <MenuBookIcon />, path: "/admin/Cuisines" },
    {
      title: "Bookings",
      icon: <CollectionsBookmarkIcon />,
      path: "/admin/Bookings",
    },
  ];
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#ffc7a3" }}>
      <CssBaseline />
      <AppBar
        sx={{ backgroundColor: "#ffc7a3" }}
        elevation={0}
        position="fixed"
        open={open}
      >
        <Toolbar sx={{ backgroundColor: "#ffc7a3" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            // sx={{
            //   marginRight: 5,
            //   ...(open && { display: "none" }),
            // }}
          >
            <MenuIcon sx={{ color: "black" }} />
          </IconButton>
          <Typography
            sx={{
              fontWeight: "bolder",
              fontSize: { xs: "20px", sm: "30px" },
              fontFamily: "sans-serif",
              color: "#fd683e",
              display: open ? "none" : "block",
            }}
          >
            Chef
            <span style={{ fontWeight: "bolder", color: "#000" }}>
              Connect.
            </span>
          </Typography>
          <Box
            sx={{
              display: { xs: open ? "none" : "flex", sm: "flex" },
              justifyContent: "flex-end",
              width: { xs: "70%", sm: "100%" },
            }}
          >
            <Account host={host} admin={admin} />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            display: open ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bolder",
              fontSize: { xs: "20px", sm: "30px" },
              fontFamily: "sans-serif",
              color: "#fd683e",
            }}
          >
            Chef
            <span style={{ fontWeight: "bolder", color: "#000" }}>
              Connect.
            </span>
          </Typography>
        </DrawerHeader>
        {!open && <Toolbar />}
        <List>
          {sideBarOptions.map((text, index) => (
            <ListItem
              key={index}
              component={Link}
              to={text.path}
              disablePadding
              sx={{
                display: "block",
                color: "black",
                backgroundColor: active == text.title && "#ffe0cc",
                borderRadius: active == text.title ? "30px" : "0px",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: active == text.title && "#fd683e",
                  }}
                >
                  {text.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontWeight: "bolder",
                        color: active == text.title && "#fd683e",
                      }}
                    >
                      {text?.title}
                    </Typography>
                  }
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
