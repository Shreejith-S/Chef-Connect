import { Box } from "@mui/material";
import React from "react";
import PageBreadcrumbs from "../Components/Breadcrumbs/PageBreadcrumbs";
import InsertForm from "../Components/Chef/InsertForm";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";

export default function EditChef() {
  const { getSingleChef, singleChef } = useContext(AdminContext);
  const { id } = useParams();
  useEffect(() => {
    getSingleChef(id);
  }, [id]);
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
        <InsertForm data={singleChef} />
      </Box>
    </Box>
  );
}
