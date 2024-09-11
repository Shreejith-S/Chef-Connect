import { Box, Typography } from "@mui/material";
import React from "react";
import HomeHero from "../Components/HomeContents/HomeHero";
import Benefits from "../Components/HomeContents/Benefits";
import AboutContent from "../Components/About/AboutContent";
import Cuisines from "../Components/Cuisines/Cuisines";
import { useContext } from "react";
import { CustomerContext } from "../Context/Context";
import { useEffect } from "react";
import AllChefs from "../Components/Chefs/AllChefs";

export default function Home() {
  const { viewAllCuisines, cuisines, customer, viewAllChefs, chefs } =
    useContext(CustomerContext);
  useEffect(() => {
    viewAllCuisines();
    viewAllChefs();
  }, []);
  return (
    <Box>
      <Box>
        <HomeHero />
      </Box>
      <Box>
        <Benefits />
      </Box>
      <Box>
        <AboutContent />
      </Box>
      {customer && (
        <Box>
          <Cuisines data={cuisines} />
        </Box>
      )}
      <Box>
        <AllChefs data={chefs} />
      </Box>
    </Box>
  );
}
