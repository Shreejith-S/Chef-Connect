import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import CuisineCard from "./CuisineCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function Cuisines({ data }) {
  return (
    <Box sx={{ pt: 10, pb: 10 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 3,
          }}
        >
          <Grid item xs={12} sm={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bolder",
                  fontSize: "30px",
                  color: "rgb(255, 165, 0)",
                }}
              >
                Our <span style={{ color: "black" }}>Cuisines</span>
              </Typography>
              <Typography sx={{ textAlign: "center" }} variant="caption">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut,
                placeat?
              </Typography>
            </Box>
          </Grid>
          {data?.map((item, index) => (
            <Grid item xs={6} key={index} sm={3}>
              <CuisineCard data={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
