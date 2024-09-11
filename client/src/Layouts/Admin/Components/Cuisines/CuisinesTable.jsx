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
import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
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

export default function CuisinesTable({ data }) {
  const { deleteCuisine, host } = useContext(AdminContext);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    setOpen(false);
    deleteCuisine(selectedCuisine?._id);
  };
  const handleOpenDeleteDialog = (data) => {
    setOpen(true);
    setSelectedCuisine(data);
    // updateCustomerStatus(id, status);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <TableContainer>
      <Table
        sx={{ maxWidth: { xs: "400px", sm: "100%" }, overflow: "auto" }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Picture</StyledTableCell>
            <StyledTableCell>Cuisine</StyledTableCell>
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
                  <StyledTableCell component="th" scope="row">
                    <Box sx={{ width: "150px", height: "100px" }}>
                      <img
                        src={`${host}/uploads/admin/${row?.picture}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>{row?.title}</StyledTableCell>
                  <StyledTableCell>{formattedDate}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleOpenDeleteDialog(row)}
                      sx={{ backgroundColor: "black" }}
                    >
                      Delete
                    </Button>
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
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Attempt to delete cuisine!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure, want to delete {selectedCuisine?.title} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No, Cancel</Button>
          <Button onClick={handleDelete}>Yes, Delete</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}
