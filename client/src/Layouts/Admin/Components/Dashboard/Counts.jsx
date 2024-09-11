import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import Person4Icon from "@mui/icons-material/Person4";
import FoodBankIcon from "@mui/icons-material/FoodBank";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Counts({ data }) {
  console.log(data);
  const reportData = [
    {
      title: "Total Customers",
      icon: (
        <SupervisedUserCircleIcon
          sx={{
            width: { xs: 50, sm: 70 },
            height: { xs: 50, sm: 70 },
            color: "white",
          }}
        />
      ),
      count: data?.customerCount,
    },
    {
      title: "Total Chefs",
      icon: (
        <Person4Icon
          sx={{
            width: { xs: 50, sm: 70 },
            height: { xs: 50, sm: 70 },
            color: "white",
          }}
        />
      ),
      count: data?.chefCount,
    },
    {
      title: "Total Cuisines",
      icon: (
        <FoodBankIcon
          sx={{
            width: { xs: 50, sm: 70 },
            height: { xs: 50, sm: 70 },
            color: "white",
          }}
        />
      ),
      count: data?.cuisineCount,
    },
  ];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {reportData?.map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper
              elevation={10}
              sx={{
                width: "100%",
                display: "flex",
                p: 2,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Typography>{item?.title}</Typography>
                <Typography
                  sx={{
                    fontSize: "40px",
                    fontWeight: "bolder",
                    fontFamily: "fantasy",
                  }}
                >
                  {item?.count}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ThemeProvider
                  theme={{
                    palette: {
                      primary: {
                        main: "#007FFF",
                        dark: "#0066CC",
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 60, sm: 80 },
                      height: { xs: 60, sm: 80 },
                      borderRadius: 1,
                      bgcolor: "primary.main",
                      backgroundImage:
                        "linear-gradient(135deg, #FF7D29, #FF9A00, #FFC96F)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "5px 5px 5px #0000002b",
                    }}
                  >
                    {item?.icon}
                  </Box>
                </ThemeProvider>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
