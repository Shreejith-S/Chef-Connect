import React from "react";
import PageBreadcrumbs from "../Components/Breadcrumbs/PageBreadcrumbs";
import { Box, Button } from "@mui/material";
import CuisinesTable from "../Components/Cuisines/CuisinesTable";
import InsertForm from "../Components/Cuisines/InsertForm";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
import { useEffect } from "react";

export default function Cuisines() {
  const { cuisines, getAllCUisines } = useContext(AdminContext);
  useEffect(() => {
    getAllCUisines();
  }, []);
  return (
    <Box>
      <Box sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
        <Box>
          <PageBreadcrumbs
            firstTitle="Dashboard"
            isLink={false}
            isSecond={true}
            secondTitle="Cuisines"
            secondPath="/admin/Customers"
            isThird={false}
            thirdTitle="View"
          />
        </Box>
        <Box>
          <InsertForm />
        </Box>
      </Box>
      <Box sx={{ p: 1 }}>
        <CuisinesTable data={cuisines} />
      </Box>
    </Box>
  );
}
