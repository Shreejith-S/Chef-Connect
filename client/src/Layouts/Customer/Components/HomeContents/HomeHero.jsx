import React from "react";
import { Box, Typography } from "@mui/material";

export default function HomeHero() {
  return (
    <Box className="home-hero-area hero-bg">
      <Box className="home-text-box">
        <Box>
          <Typography className="subtitle">CHEF AT YOUR DOOR</Typography>
        </Box>
        <Box>
          <Typography variant="h3" className="h3">
            Restaurant-Quality. Home-Delivered.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
