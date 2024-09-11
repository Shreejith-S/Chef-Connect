import React from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import SyncIcon from "@mui/icons-material/Sync";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
const Benefits = () => {
  return (
    <Box className="list-section" sx={{ py: 10 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              className="list-box"
              sx={{
                display: "flex",
                alignItems: "center",
                mb: { xs: 4, md: 0 },
              }}
            >
              <Box className="list-icon" sx={{ mr: 2 }}>
                <VolunteerActivismIcon sx={{ fontSize: 40, color: "orange" }} />
              </Box>
              <Box className="content">
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: "18px",
                    marginBottom: "4px",
                  }}
                >
                  Hygienic Meals
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Prepared with utmost care
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              className="list-box"
              sx={{
                display: "flex",
                alignItems: "center",
                mb: { xs: 4, md: 0 },
              }}
            >
              <Box className="list-icon" sx={{ mr: 2 }}>
                <MenuBookIcon sx={{ fontSize: 40, color: "orange" }} />
              </Box>
              <Box className="content">
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: "18px",
                    marginBottom: "4px",
                  }}
                >
                  Custom Menus
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tailored to your taste
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              className="list-box"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box className="list-icon" sx={{ mr: 2 }}>
                <BookOnlineIcon sx={{ fontSize: 40, color: "orange" }} />
              </Box>
              <Box className="content">
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: "18px",
                    marginBottom: "4px",
                  }}
                >
                  Easy Booking
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Simple and quick process
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Benefits;
