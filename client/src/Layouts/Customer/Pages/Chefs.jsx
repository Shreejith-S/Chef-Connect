import React from "react";
import PageBanner from "../Components/Banner/PageBanner";
import { Box } from "@mui/material";
import AllChefs from "../Components/Chefs/AllChefs";
import { CustomerContext } from "../Context/Context";
import { useContext } from "react";
import { useEffect } from "react";
import Cuisines from "../Components/Cuisines/Cuisines";

export default function Chefs() {
  const { viewAllChefs, chefs, viewAllCuisines, cuisines, customer } =
    useContext(CustomerContext);
  useEffect(() => {
    viewAllChefs();
    viewAllCuisines();
  }, []);
  return (
    <Box>
      <Box>
        <PageBanner title="Chefs" isSubTitle={false} subTitle="" />
      </Box>
      <Box>
        <AllChefs data={chefs} />
      </Box>
      {customer && (
        <Box>
          <Cuisines data={cuisines} />
        </Box>
      )}
    </Box>
  );
}
