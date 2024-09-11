import { Avatar, Box, Paper, Tooltip } from "@mui/material";
import React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { IconButton, Typography } from "@mui/material";
import Staff from "@mui/icons-material/Person2";
import { useContext } from "react";
import Email from "@mui/icons-material/Mail";
import Phone from "@mui/icons-material/LocalPhone";
import Address from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import EditProfile from "./EditProfile";
import { useState } from "react";
import { CustomerContext } from "../../Context/Context";

export default function ProfileContent() {
  const { customer, host } = useContext(CustomerContext);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: "100%", sm: "50%" },
        backgroundColor: "#3b587612",
        p: 5,
        borderRadius: "50px",
      }}
    >
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2%",
          flexDirection: "column",
        }}
      >
        <Box>
          <Avatar
            src={`${host}/uploads/customer/${customer?.profile}`}
            sx={{
              width: { sm: 150, xs: 130 },
              height: { sm: 150, xs: 130 },
            }}
          />
        </Box>
        <Box>
          <Typography variant="overline" sx={{ fontWeight: "bolder" }}>
            {customer?.name}
          </Typography>
        </Box>
      </Box>
      <Paper sx={{ mt: 1, borderRadius: "20px" }} elevation={0}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              sx={{ borderRadius: "20px" }}
              component="div"
              id="nested-list-subheader"
            >
              <Typography
                variant="overline"
                sx={{
                  fontWeight: "bolder",
                  fontSize: { xs: "14px", sm: "20px" },
                }}
              >
                Profile Information
              </Typography>
              <IconButton
                onClick={handleClickOpen}
                sx={{
                  float: "right",
                  m: { sm: 1, xs: 0 },
                }}
              >
                <EditIcon />
              </IconButton>
            </ListSubheader>
          }
        >
          <ListItemButton>
            <ListItemIcon>
              <Staff />
            </ListItemIcon>
            <Tooltip title="Name" arrow placement="top">
              <ListItemText primary={customer?.name} />
            </Tooltip>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <Tooltip title="Email" arrow placement="top">
              <ListItemText primary={customer?.email} />
            </Tooltip>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Phone />
            </ListItemIcon>
            <Tooltip title="Phone" arrow placement="top">
              <ListItemText primary={customer?.phone} />
            </Tooltip>
          </ListItemButton>

          {customer?.address && (
            <ListItemButton>
              <ListItemIcon>
                <Address />
              </ListItemIcon>
              <Tooltip title="Address" arrow placement="top">
                <ListItemText
                  sx={{ textTransform: "capitalize" }}
                  primary={customer?.address}
                />
              </Tooltip>
            </ListItemButton>
          )}
          <EditProfile
            handleClickOpen={handleClickOpen}
            open={open}
            setOpen={setOpen}
          />
        </List>
      </Paper>
    </Paper>
  );
}
