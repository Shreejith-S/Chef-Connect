import { Box } from "@mui/material";
import React from "react";
import PageBreadcrumbs from "../Components/Breadcrumbs/PageBreadcrumbs";
import InsertForm from "../Components/Chef/InsertForm";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
import { useEffect } from "react";

export default function InsertChef() {
  return (
    <Box>
      <Box sx={{ p: 1 }}>
        <PageBreadcrumbs
          firstTitle="Dashboard"
          isLink={true}
          isSecond={true}
          secondTitle="Chefs"
          secondPath="/admin/Chefs"
          isThird={true}
          thirdTitle="Insert New"
        />
      </Box>
      <Box sx={{ p: 1 }}>
        <InsertForm />
      </Box>
    </Box>
  );
}
