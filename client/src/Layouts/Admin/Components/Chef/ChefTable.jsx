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
import { Avatar, Box, Button, Chip, Rating, Typography } from "@mui/material";
import { useContext } from "react";
import { AdminContext } from "../../Context/Context";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Link } from "react-router-dom";

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

export default function ChefTable({ data }) {
  const { updateCustomerStatus, host, deleteChef } = useContext(AdminContext);
  const [selectedChef, setSelectedChef] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    setOpen(false);
    deleteChef(selectedChef?._id);
  };
  const handleOpenDeleteDialog = (data) => {
    setOpen(true);
    setSelectedChef(data);
    // updateCustomerStatus(id, status);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Chef</StyledTableCell>
            <StyledTableCell>Ratings</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell>
            <StyledTableCell>Cuisines</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length > 0 ? (
            data?.map((row, index) => {
              const formattedDate = moment(data?.createdAt).format(
                "DD-MM-YYYY"
              );
              const totalRating = row?.ratings?.reduce((sum, item) => sum + parseFloat(item.rating), 0);

              // Calculate the overall rating by dividing the sum by the number of ratings
              const overallRating = totalRating / row?.ratings?.length;
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
                        <Avatar src={`${host}/uploads/admin/${row?.profile}`} />
                      </Box>
                      <Box>
                        {row?.name}
                        <br />
                        {row?.place}
                      </Box>
                    </Box>
                    <Typography
                      gutterBottom
                      color="text.secondary"
                      variant="caption"
                    >
                      Registered on {formattedDate}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      backgroundColor:
                        row?.status == "Active" ? "#e5ffe5" : "#ffe9e9",
                    }}
                  >
                    <Rating value={parseFloat(overallRating)} precision={0.5} readOnly />
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
                    <Box
                      sx={{
                        width: "max-content",
                        // backgroundColor: "red",
                        display: "flex",
                        // justifyContent: "center",
                        // flexWrap: "wrap",
                        flexDirection: "column",
                      }}
                    >
                      {row?.cuisine_id?.map((item, index) => (
                        <Chip
                          sx={{ mt: 1, width: "fit-content" }}
                          size="small"
                          key={index}
                          label={item?.title}
                          color={
                            row?.foodType == "Both"
                              ? "secondary"
                              : row?.foodType == "Veg"
                                ? "success"
                                : "error"
                          }
                        />
                      ))}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      backgroundColor:
                        row?.status == "Active" ? "#e5ffe5" : "#ffe9e9",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "2%",
                        flexDirection: { xs: "column", sm: "row" },
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => handleOpenDeleteDialog(row)}
                        sx={{ backgroundColor: "black", mt: { xs: 1, sm: 0 } }}
                      >
                        Delete
                      </Button>
                      <Button
                        sx={{ mt: { xs: 1, sm: 0 } }}
                        variant="contained"
                        component={Link}
                        to={`/admin/editChef/${row?._id}`}
                      >
                        Edit
                      </Button>
                    </Box>
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
                No chefs found!
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
        <DialogTitle>{"Attempt to delete chef!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure, want to delete {selectedChef?.name} ?
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
