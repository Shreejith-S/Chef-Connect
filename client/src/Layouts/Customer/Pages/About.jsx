import { Box } from "@mui/material";
import React from "react";
import PageBanner from "../Components/Banner/PageBanner";
import AboutContent from "../Components/About/AboutContent";
import Benefits from "../Components/HomeContents/Benefits";
import Cuisines from "../Components/Cuisines/Cuisines";
import { useEffect } from "react";
import { CustomerContext } from "../Context/Context";
import { useContext } from "react";

export default function About() {
  const { viewAllCuisines, cuisines, customer } = useContext(CustomerContext);
  useEffect(() => {
    viewAllCuisines();
  }, []);
  return (
    <Box>
      <Box>
        <PageBanner title="About Us" isSubTitle={false} subTitle="" />
      </Box>
      <Box>
        <AboutContent />
      </Box>
      <Box>
        <Benefits />
      </Box>
      {customer && (
        <Box>
          <Cuisines data={cuisines} />
        </Box>
      )}
    </Box>
  );
}
