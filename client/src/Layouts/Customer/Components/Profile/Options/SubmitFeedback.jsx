import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Chip } from "@mui/material";
import { useContext } from "react";
import { CustomerContext } from "../../../Context/Context";

export default function SubmitFeedback({ row }) {
  const { giveFeedbackForBooking } = useContext(CustomerContext);
  const [open, setOpen] = React.useState(false);
  const [feedback, setFeedback] = React.useState("");
  const [feedbackError, setFeedbackError] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (!feedback) {
      setFeedbackError(true);
    } else {
      setFeedbackError(false);
      giveFeedbackForBooking(row?._id, { feedback: feedback });
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <Chip
        sx={{ mt: 1 }}
        onClick={handleClickOpen}
        color="warning"
        label="submit feedback"
        variant="outlined"
      />

      <Dialog open={open} fullWidth onClose={handleClose}>
        <DialogTitle>Submit your feedback here</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Feel free to submit your valuable feedback about our service here.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="feedback"
            onChange={(e) => setFeedback(e.target.value)}
            label="Type your feedback here"
            fullWidth
            multiline
            rows={3}
            variant="standard"
            error={feedbackError}
            helperText={feedbackError ? "Feedback is required." : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
