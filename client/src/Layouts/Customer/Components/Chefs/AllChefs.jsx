import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import ChefCard from "./ChefCard";

export default function AllChefs({ data }) {
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
                Our <span style={{ color: "black" }}>Chefs</span>
              </Typography>
              <Typography sx={{ textAlign: "center" }} variant="caption">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut,
                placeat?
              </Typography>
            </Box>
          </Grid>
          {data?.map((item, index) => (
            <Grid item xs={12} key={index} sm={3}>
              <ChefCard data={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
