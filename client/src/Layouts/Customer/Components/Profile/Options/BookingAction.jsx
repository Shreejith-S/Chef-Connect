import { Chip, TextField } from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CancelBookings from "./CancelBookings";
import { useContext } from "react";
import { CustomerContext } from "../../../Context/Context";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function BookingAction({ row }) {
  const { payForBooking } = useContext(CustomerContext);
  const [open, setOpen] = useState(false);
  const [pay, setPay] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [charge, setCharge] = useState(row?.charge || "");
  const [transactionIdError, setTransactionIdError] = useState(false);
  const [chargeError, setChargeError] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    let hasError = false;

    if (!transactionId) {
      setTransactionIdError(true);
      hasError = true;
    } else {
      setTransactionIdError(false);
    }

    if (!charge) {
      setChargeError(true);
      hasError = true;
    } else {
      setChargeError(false);
    }

    if (!hasError) {
      // Perform the submit action
      let data = { transactionId, paymentStatus: "Payment initiated" };
      payForBooking(row?._id, data);
      handleClose();
    }
  };

  return (
    <div>
      {row?.paymentStatus == "Payment Verified" ? (
        <Chip color="secondary" label={row?.status} />
      ) : (
        <Chip onClick={handleClickOpen} color="secondary" label={row?.status} />
      )}
      <BootstrapDialog
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {pay ? "Pay for the booking" : "Response from Admin"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {pay ? (
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/a3202e58-17ef-11ee-9a70-8e93953183bb/cleaned_qr.png"
                    alt=""
                    style={{ width: "80%", height: "50vh", objectFit: "cover" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={charge}
                    fullWidth
                    readOnly
                    label="Charge"
                    error={chargeError}
                    helperText={chargeError ? "Charge is required." : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={(e) => setTransactionId(e.target.value)}
                    fullWidth
                    label="Enter the transaction id"
                    value={transactionId}
                    error={transactionIdError}
                    helperText={
                      transactionIdError ? "Transaction ID is required." : ""
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">{row?.response}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {pay ? (
            <Box>
              <Button onClick={() => setPay(false)}>Cancel</Button>
              <Button autoFocus onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex" }}>
              <CancelBookings row={row} button={true} />
              <Button onClick={() => setPay(true)}>Pay</Button>
            </Box>
          )}
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
