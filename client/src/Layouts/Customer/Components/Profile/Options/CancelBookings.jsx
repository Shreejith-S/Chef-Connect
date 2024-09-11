import { Chip, Paper, Tooltip } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useContext } from "react";
import { CustomerContext } from "../../../Context/Context";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function CancelBookings({ row, button }) {
  const { cancelMyBooking } = useContext(CustomerContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    cancelMyBooking(row?._id);
    setOpen(false);
  };
  return (
    <div>
      {button ? (
        <Button onClick={handleClickOpen} color="error">
          Cancel
        </Button>
      ) : (
        <Tooltip title="click to cancel request" placement="top" arrow>
          <Chip
            sx={{ cursor: "pointer" }}
            component={Paper}
            elevation={5}
            onClick={handleClickOpen}
            color="warning"
            label={row?.status}
          />
        </Tooltip>
      )}
      <Dialog
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Attempt to cancel the request?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure, want to cancel this request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            No, cancel
          </Button>
          <Button color="success" onClick={handleCancel}>
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
