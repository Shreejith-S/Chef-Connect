import { Box } from "@mui/material";
import React from "react";
import PageBreadcrumbs from "../Components/Breadcrumbs/PageBreadcrumbs";
import Counts from "../Components/Dashboard/Counts";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
import { useEffect } from "react";
import Contents from "../Components/Dashboard/Contents";

export default function Dashboard() {
  const {
    getCounts,
    report,
    state,
    getChefBasedOnMealType,
    chefVarieties,
    bookings,
    getAllBookings,
    host,
    chefs,
    getAllChefs,
  } = useContext(AdminContext);
  useEffect(() => {
    getCounts();
    getAllBookings();
    getAllChefs();
  }, [state]);
  return (
    <Box>
      <Box sx={{ p: 1 }}>
        <PageBreadcrumbs
          firstTitle="Dashboard"
          isLink={false}
          isSecond={false}
          secondTitle="Customers"
          secondPath="/admin/Customers"
          isThird={false}
          thirdTitle="View"
        />
      </Box>
      <Box sx={{ p: 1 }}>
        <Counts data={report} />
      </Box>
      <Box sx={{ p: 1 }}>
        <Contents
          host={host}
          chefs={chefs}
          bookings={bookings}
          chefVarieties={chefVarieties}
        />
      </Box>
    </Box>
  );
}
