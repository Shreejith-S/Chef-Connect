import { Box } from "@mui/material";
import React from "react";
import PageBreadcrumbs from "../Components/Breadcrumbs/PageBreadcrumbs";
import CustomerTable from "../Components/Customers/CustomerTable";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
import { useEffect } from "react";

export default function Customers() {
  const { getAllCustomers, customers } = useContext(AdminContext);
  useEffect(() => {
    getAllCustomers();
  }, []);
  return (
    <Box>
      <Box sx={{ p: 1 }}>
        <PageBreadcrumbs
          firstTitle="Dashboard"
          isLink={false}
          isSecond={true}
          secondTitle="Customers"
          secondPath="/admin/Customers"
          isThird={false}
          thirdTitle="View"
        />
      </Box>
      <Box sx={{ p: 1 }}>
        <CustomerTable data={customers} />
      </Box>
    </Box>
  );
}
