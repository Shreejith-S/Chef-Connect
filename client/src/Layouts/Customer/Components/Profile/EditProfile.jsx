import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useState, useEffect } from "react";
import { CustomerContext } from "../../Context/Context";

export default function EditProfile({ open, setOpen }) {
  const { customer, updateProfile } = useContext(CustomerContext);
  const [updatedCustomer, setUpdatedCustomer] = useState();
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  useEffect(() => {
    setUpdatedCustomer(customer);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setPasswordError("");
    setPasswordMatchError("");

    if (name === "profile" && files && files[0]) {
      setUpdatedCustomer((prevStaff) => ({
        ...prevStaff,
        [name]: files[0],
      }));
    } else {
      setUpdatedCustomer((prevStaff) => ({
        ...prevStaff,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async () => {
    if (updatedCustomer?.npass !== updatedCustomer?.cpass) {
      setPasswordMatchError("Passwords do not match");
      return;
    }

    const Data = new FormData();
    Data.append("name", updatedCustomer?.name);
    Data.append("phone", updatedCustomer?.phone);
    if (updatedCustomer?.address != undefined) {
      Data.append("address", updatedCustomer?.address);
    }
    Data.append("profile", updatedCustomer?.profile);
    if (updatedCustomer?.npass) {
      Data.append("password", updatedCustomer?.npass);
    }
    updateProfile(Data);
    await handleClose();
  };

  return (
    <React.Fragment>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit your profile information</DialogContentText>
          <TextField
            onChange={handleChange}
            autoFocus
            required
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="filled"
            value={updatedCustomer?.name || ""}
          />
          <TextField
            onChange={handleChange}
            required
            margin="dense"
            name="phone"
            label="Contact Number"
            type="number"
            fullWidth
            variant="filled"
            value={updatedCustomer?.phone || ""}
          />
          <TextField
            onChange={handleChange}
            required
            margin="dense"
            name="address"
            label="Address"
            type="text"
            multiline
            fullWidth
            variant="filled"
            value={updatedCustomer?.address || ""}
          />
          <TextField
            onChange={handleChange}
            required
            margin="dense"
            name="profile"
            label="Profile Picture"
            InputLabelProps={{ shrink: true }}
            type="file"
            fullWidth
            variant="filled"
          />
          <TextField
            onChange={handleChange}
            required
            margin="dense"
            name="npass"
            label="Enter New Password"
            fullWidth
            variant="filled"
            type="password"
            error={Boolean(passwordMatchError)}
            helperText={passwordMatchError}
          />
          <TextField
            onChange={handleChange}
            required
            margin="dense"
            name="cpass"
            label="Confirm Password"
            fullWidth
            variant="filled"
            type="password"
            error={Boolean(passwordMatchError)}
            helperText={passwordMatchError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
