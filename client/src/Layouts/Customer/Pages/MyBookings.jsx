import { Box } from "@mui/material";
import React from "react";
import PageBanner from "../Components/Banner/PageBanner";
import BookingsTable from "../Components/Profile/BookingsTable";
import { useContext } from "react";
import { CustomerContext } from "../Context/Context";
import { useEffect } from "react";

export default function MyBookings() {
  const { getMyBookings, myBookings } = useContext(CustomerContext);
  useEffect(() => {
    getMyBookings();
  }, []);
  console.log(myBookings);
  const filtered = myBookings.slice().reverse();
  return (
    <Box>
      <Box>
        <PageBanner title="Bookings" isSubTitle={true} subTitle="My Bookings" />
      </Box>
      <Box sx={{ p: 3 }}>
        <BookingsTable data={filtered} />
      </Box>
    </Box>
  );
}
