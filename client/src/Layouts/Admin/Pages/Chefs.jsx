import { Box, Button } from "@mui/material";
import React from "react";
import PageBreadcrumbs from "../Components/Breadcrumbs/PageBreadcrumbs";
import ChefTable from "../Components/Chef/ChefTable";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function Chefs() {
  const { getAllChefs, chefs } = useContext(AdminContext);
  useEffect(() => {
    getAllChefs();
  }, []);
  return (
    <Box>
      <Box sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
        <Box>
          <PageBreadcrumbs
            firstTitle="Dashboard"
            isLink={false}
            isSecond={true}
            secondTitle="Chefs"
            secondPath="/admin/Customers"
            isThird={false}
            thirdTitle="View"
          />
        </Box>
        <Box>
          <Button
            startIcon={<AddBoxIcon />}
            component={Link}
            to="/admin/InsertNewChef"
            variant="outlined"
            sx={{ color: "black", border: "1px solid black" }}
          >
            Insert New
          </Button>
        </Box>
      </Box>
      <Box sx={{ p: 1 }}>
        <ChefTable data={chefs} />
      </Box>
    </Box>
  );
}
