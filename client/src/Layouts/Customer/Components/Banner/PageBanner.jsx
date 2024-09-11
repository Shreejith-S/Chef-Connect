import { Box, Typography } from "@mui/material";
import React from "react";
import "../../../../App.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

export default function PageBanner({ title, isSubTitle, subTitle }) {
  return (
    <Box
      sx={{
        backgroundColor: "#07212e",
        height: "30vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pt: "4%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "50%",
          p: 5,
        }}
      >
        <Box>
          <Typography className="pageBannerTitle">{title}</Typography>
        </Box>
        <Box>
          <Breadcrumbs
            sx={{ color: "white", opacity: "60%" }}
            aria-label="breadcrumb"
          >
            <Link
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bolder",
                opacity: "60%",
              }}
              underline="hover"
              color="inherit"
              to="/"
            >
              Home
            </Link>
            <Typography
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bolder",
              }}
            >
              {isSubTitle ? subTitle : title}
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>
    </Box>
  );
}
