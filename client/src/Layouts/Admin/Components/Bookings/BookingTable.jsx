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
import {
  Badge,
  Box,
  Button,
  Chip,
  DialogContentText,
  Divider,
  Tooltip,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useState, useEffect, useContext } from "react";
import AdditionalBookingDetails from "./AdditionalBookingDetails";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import { AdminContext } from "../../Context/Context";
import PaymentDetails from "./PaymentDetails";
import ViewFeedback from "./ViewFeedback";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(0),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(0),
  },
}));

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function BookingTable({ data, host, chefs, forDashboard }) {
  const { updateBooking } = useContext(AdminContext);
  const [open, setOpen] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openUpdateStatusModal, setOpenUpdateStatusModal] = useState(false);
  const [personName, setPersonName] = useState([]);
  const [status, setStatus] = useState("");
  const [response, setResponse] = useState("");
  const [charge, setCharge] = useState("");
  const [errors, setErrors] = useState({});
  console.log(selectedBooking);
  useEffect(() => {
    if (selectedBooking) {
      setStatus(selectedBooking.status || "");
      setPersonName(selectedBooking.chef_id?.map((item) => item._id) || []);
      setCharge(selectedBooking.charge || "");
      setResponse(selectedBooking.response || "");
    }
  }, [openUpdateStatusModal]);

  const handleChangePersonName = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeResponse = (event) => {
    setResponse(event.target.value);
  };

  const handleChangeCharge = (event) => {
    setCharge(event.target.value);
  };

  const validate = () => {
    const newErrors = {};
    if (!status) newErrors.status = "Status is required";
    if (!charge && status === "Accepted") {
      newErrors.charge = "Charge is required";
    }
    if (charge < 0) {
      newErrors.charge = "Charge must be a positive number";
    }
    if (personName.length === 0 && status === "Accepted")
      newErrors.personName = "At least one chef must be selected";
    if (!response && status !== "Completed")
      newErrors.response = "Response is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClickOpenUpdateStatusModal = (booking) => {
    setSelectedBooking(booking);
    setOpenUpdateStatusModal(true);
  };

  const handleCloseUpdateStatusModal = () => {
    setOpenUpdateStatusModal(false);
    if (status == "Completed") {
      setStatus(selectedBooking?.status);
      setResponse("");
      setPersonName([]);
      setCharge("");
    }
    setSelectedBooking(null);
    setErrors({});
  };

  const handleClickOpen = (data) => {
    setSelectedBooking(data);
    setOpen(true);
  };
  const handleClickOpenPayment = (data) => {
    setSelectedBooking(data);
    setOpenPaymentDialog(true);
  };
  const handleClickOpenFeedback = (data) => {
    setSelectedBooking(data);
    setOpenFeedback(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setTimeout(() => {
    //   setSelectedBooking(null);
    // }, 1000);
  };
  const handleClosePayment = () => {
    setOpenPaymentDialog(false);
    setTimeout(() => {
      setSelectedBooking(null);
    }, 1000);
  };
  const handleCloseFeedback = () => {
    setOpenFeedback(false);
    // setTimeout(() => {
    //   setSelectedBooking(null);
    // }, 1000);
  };

  const handleSubmit = () => {
    if (validate()) {
      let finalData;
      if (status === "Accepted") {
        finalData = {
          status,
          chefs: personName,
          charge,
          response,
        };
      } else if (status === "Rejected") {
        finalData = {
          status,
          response,
        };
      } else {
        finalData = {
          status,
        };
      }
      updateBooking(selectedBooking?._id, finalData);
      handleCloseUpdateStatusModal();
    }
  };

  return (
    <TableContainer component={Paper}>
      <Dialog
        open={openUpdateStatusModal}
        onClose={handleCloseUpdateStatusModal}
      >
        <DialogTitle>Update Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the booking status and provide an appropriate message. If
            you're accepting the booking, then assign the chef.
          </DialogContentText>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl error={!!errors.status}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Update Status
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={status}
                    onChange={handleChangeStatus}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Accepted"
                      control={<Radio color="secondary" size="small" />}
                      label="Accept"
                    />
                    {selectedBooking?.status !== "Accepted" ? (
                      <FormControlLabel
                        value="Rejected"
                        control={<Radio color="secondary" size="small" />}
                        label="Reject"
                      />
                    ) : (
                      <FormControlLabel
                        value="Completed"
                        control={<Radio color="secondary" size="small" />}
                        label="Complete"
                      />
                    )}
                  </RadioGroup>
                </FormControl>
              </Grid>
              {status === "Accepted" && (
                <Box sx={{ width: "100%", m: 2 }}>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={!!errors.personName}>
                      <InputLabel id="demo-multiple-name-label">
                        Choose chefs
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={personName}
                        onChange={handleChangePersonName}
                        input={<OutlinedInput label="Choose chefs" />}
                        MenuProps={MenuProps}
                      >
                        {chefs.map((name, index) => (
                          <MenuItem key={index} value={name?._id}>
                            {name?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 1 }}>
                    <TextField
                      required
                      margin="dense"
                      id="charge"
                      name="charge"
                      label="Enter the charge here"
                      fullWidth
                      value={charge}
                      type="number"
                      onChange={handleChangeCharge}
                      error={!!errors.charge}
                      helperText={errors.charge}
                    />
                  </Grid>
                </Box>
              )}
              {status !== "Completed" && (
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="response"
                    name="response"
                    label="Type your response here"
                    fullWidth
                    multiline
                    rows={2}
                    value={response}
                    onChange={handleChangeResponse}
                    error={!!errors.response}
                    helperText={errors.response}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateStatusModal}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent>
          <AdditionalBookingDetails data={selectedBooking} host={host} />
        </DialogContent>
      </BootstrapDialog>
      <BootstrapDialog
        fullWidth
        onClose={handleCloseFeedback}
        aria-labelledby="customized-dialog-title"
        open={openFeedback}
      >
        <DialogContent>
          <ViewFeedback data={selectedBooking} />
        </DialogContent>
      </BootstrapDialog>
      <BootstrapDialog
        fullWidth
        onClose={handleClosePayment}
        aria-labelledby="customized-dialog-title"
        open={openPaymentDialog}
      >
        <DialogContent>
          <PaymentDetails
            data={selectedBooking}
            handleClosePayment={handleClosePayment}
          />
        </DialogContent>
      </BootstrapDialog>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Booked By</StyledTableCell>
            <StyledTableCell>Cuisine</StyledTableCell>
            {!forDashboard && <StyledTableCell>Status</StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length > 0 ? (
            data?.map((row, index) => {
              const formattedDate = moment(row?.createdAt).format("DD-MM-YYYY");
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    <Typography variant="subtitle2">{row?.date}</Typography>
                    <Typography variant="caption">
                      booked on {formattedDate}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Tooltip title="click to view more" placement="top" arrow>
                      <Badge color="secondary" variant="dot">
                        <Typography
                          sx={{ cursor: "pointer" }}
                          onClick={() => handleClickOpen(row)}
                          variant="body"
                        >
                          {row?.customer_id?.name}
                        </Typography>
                      </Badge>
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell>
                    {row?.cuisine_id?.title} | {row?.mealType}
                  </StyledTableCell>
                  {!forDashboard && (
                    <StyledTableCell>
                      <Box>
                        <Box>
                          {row?.status == "Completed" ||
                          row?.status == "Cancelled" ? (
                            <Chip
                              color={
                                row?.status == "Completed" ? "success" : "error"
                              }
                              label={row?.status}
                            />
                          ) : (
                            <Chip
                              onClick={() =>
                                handleClickOpenUpdateStatusModal(row)
                              }
                              component={Paper}
                              elevation={4}
                              sx={{ cursor: "pointer" }}
                              color={
                                row?.status === "Pending"
                                  ? "warning"
                                  : row?.status === "Accepted"
                                  ? "success"
                                  : row?.status === "Rejected"
                                  ? "error"
                                  : "secondary"
                              }
                              label={row?.status}
                            />
                          )}
                        </Box>
                        <Box>
                          {row?.paymentStatus && (
                            <Chip
                              onClick={() => handleClickOpenPayment(row)}
                              sx={{ mt: 1 }}
                              color={
                                row?.paymentStatus == "Payment initiated"
                                  ? "warning"
                                  : row?.paymentStatus == "Payment Denied"
                                  ? "error"
                                  : "success"
                              }
                              label={row?.paymentStatus}
                            />
                          )}
                        </Box>
                        <Box>
                          {row?.feedback && (
                            <Chip
                              onClick={() => handleClickOpenFeedback(row)}
                              sx={{ mt: 1 }}
                              color={"warning"}
                              variant="outlined"
                              label={"View More"}
                            />
                          )}
                        </Box>
                      </Box>
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              );
            })
          ) : (
            <StyledTableRow>
              <StyledTableCell
                colSpan={5}
                align="center"
                sx={{ color: "red" }}
                component="th"
                scope="row"
              >
                No Bookings Found!
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
