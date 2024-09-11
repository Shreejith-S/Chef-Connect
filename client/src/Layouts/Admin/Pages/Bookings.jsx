import { Box } from "@mui/material";
import React from "react";
import PageBreadcrumbs from "../Components/Breadcrumbs/PageBreadcrumbs";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
import { useEffect } from "react";
import BookingTable from "../Components/Bookings/BookingTable";

export default function Bookings() {
  const { bookings, getAllBookings, host, chefs, getAllChefs } =
    useContext(AdminContext);
  useEffect(() => {
    getAllBookings();
    getAllChefs();
  }, []);
  const filtered = bookings?.slice().reverse();
  return (
    <Box>
      <Box sx={{ p: 1 }}>
        <PageBreadcrumbs
          firstTitle="Dashboard"
          isLink={false}
          isSecond={true}
          secondTitle="Bookings"
          secondPath="/admin/Customers"
          isThird={false}
          thirdTitle="View"
        />
      </Box>
      <Box sx={{ p: 1 }}>
        <BookingTable data={filtered} host={host} chefs={chefs} />
      </Box>
    </Box>
  );
}
