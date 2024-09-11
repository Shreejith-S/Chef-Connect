import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Avatar, Box, Button } from "@mui/material";
import { useContext } from "react";
import { AdminContext } from "../../Context/Context";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomerTable({ data }) {
  const { updateCustomerStatus, host } = useContext(AdminContext);
  const handleChangeStatus = (id, pStatus) => {
    var status = "";
    if (pStatus == "Blocked") {
      status = "Active";
    } else {
      status = "Blocked";
    }
    updateCustomerStatus(id, status);
  };
  return (
    <TableContainer>
      <Table
        sx={{ maxWidth: { xs: "400px", sm: "100%" }, overflow: "auto" }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Customer</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length > 0 ? (
            data.map((row, index) => {
              const formattedDate = moment(data?.createdAt).format(
                "DD-MM-YYYY"
              );
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell
                    sx={{
                      backgroundColor:
                        row?.status == "Active" ? "#e5ffe5" : "#ffe9e9",
                    }}
                    component="th"
                    scope="row"
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "2%",
                      }}
                    >
                      <Box>
                        <Avatar
                          src={`${host}/uploads/admin/getImage/${row?.profile}`}
                        />
                      </Box>
                      <Box>{row?.name}</Box>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      backgroundColor:
                        row?.status == "Active" ? "#e5ffe5" : "#ffe9e9",
                    }}
                  >
                    {row?.phone}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      backgroundColor:
                        row?.status == "Active" ? "#e5ffe5" : "#ffe9e9",
                    }}
                  >
                    {row?.email}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      backgroundColor:
                        row?.status == "Active" ? "#e5ffe5" : "#ffe9e9",
                    }}
                  >
                    {formattedDate}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      backgroundColor:
                        row?.status == "Active" ? "#e5ffe5" : "#ffe9e9",
                    }}
                  >
                    {row?.status == "Active" ? (
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleChangeStatus(row?._id, row?.status)
                        }
                        sx={{ backgroundColor: "black" }}
                      >
                        Block
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleChangeStatus(row?._id, row?.status)
                        }
                        sx={{ backgroundColor: "#fd683e" }}
                      >
                        Unblock
                      </Button>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })
          ) : (
            <StyledTableRow>
              <StyledTableCell
                colSpan={7}
                align="center"
                sx={{ color: "red" }}
                component="th"
                scope="row"
              >
                No customers found!
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
