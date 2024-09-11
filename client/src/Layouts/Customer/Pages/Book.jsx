import { Box } from "@mui/material";
import React from "react";
import PageBanner from "../Components/Banner/PageBanner";
import BookForm from "../Components/Book/BookForm";
import { useContext } from "react";
import { CustomerContext } from "../Context/Context";
import { useEffect } from "react";

export default function Book() {
  const { viewAllCuisines, cuisines } = useContext(CustomerContext);
  useEffect(() => {
    viewAllCuisines();
  }, []);
  return (
    <Box>
      <Box>
        <PageBanner title="Book" isSubTitle={true} subTitle="Book chef" />
      </Box>
      <Box sx={{ p: 3 }}>
        <BookForm cuisines={cuisines} />
      </Box>
    </Box>
  );
}
