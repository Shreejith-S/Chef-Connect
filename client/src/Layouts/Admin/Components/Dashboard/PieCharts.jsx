import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Demo = styled("div")(({ theme }) => ({
  width: "100%",
}));
export default function PieCharts({ chefVarieties }) {
  const data = [
    {
      label: "Veg",
      value: chefVarieties?.vegChefs || 0,
      color: "#D9EDBF",
    },
    {
      label: "Non-Veg",
      value: chefVarieties?.nonVegChefs || 0,
      color: "#FFC96F",
    },
    {
      label: "Both",
      value: chefVarieties?.flexChefs || 0,
      color: "#FFA62F",
    },
  ];

  return (
    <Paper
      sx={{
        display: "flex",
        padding: 2, // Add some padding to the Paper
      }}
    >
      <Typography color="text.secondary" sx={{ fontWeight: "bolder" }}>
        Chefs
      </Typography>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            // backgroundColor: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PieChart
            series={[
              {
                data,
                innerRadius: 50,
                outerRadius: 100,
              },
            ]}
            height={200}
            width={200}
            slotProps={{
              legend: { hidden: true },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {data.map((item, index) => (
            <Demo key={index}>
              <List dense={true}>
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecordIcon sx={{ color: item?.color }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        color="text.secondary"
                        sx={{ fontWeight: "bolder" }}
                      >
                        {item?.label}
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Demo>
          ))}
        </Grid>
      </Grid>
    </Paper>
    // <Paper
    //   sx={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     width: "100%",
    //     flexDirection: "row",
    //     padding: 2, // Add some padding to the Paper
    //   }}
    // >
    //   <PieChart
    //     series={[
    //       {
    //         data,
    //         innerRadius: 50,
    //         outerRadius: 100,
    //       },
    //     ]}
    //     height={300}
    //     width={300}
    //     slotProps={{
    //       legend: { hidden: true },
    //     }}
    //   />
    //   <Grid item xs={12} md={6} sx={{ backgroundColor: "pink" }}></Grid>
    //   <Box sx={{ backgroundColor: "pink" }}>
    //     {data.map((item, index) => (
    //       <Demo>
    //         <List dense={true}>
    //           <ListItem>
    //             <ListItemIcon>
    //               <FiberManualRecordIcon sx={{ color: item?.color }} />
    //             </ListItemIcon>
    //             <ListItemText primary={item?.label} />
    //           </ListItem>
    //         </List>
    //       </Demo>
    //     ))}
    //   </Box>
    // </Paper>
  );
}
