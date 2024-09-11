import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useState, useEffect } from "react";
import { AdminContext } from "../../Context/Context";

export default function EditProfile({ open, setOpen }) {
  const { admin, updateProfile } = useContext(AdminContext);
  const [updatedAdmin, setUpdatedAdmin] = useState();
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  useEffect(() => {
    setUpdatedAdmin(admin);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setPasswordError("");
    setPasswordMatchError("");

    if (name === "profile" && files && files[0]) {
      setUpdatedAdmin((prevStaff) => ({
        ...prevStaff,
        [name]: files[0],
      }));
    } else {
      setUpdatedAdmin((prevStaff) => ({
        ...prevStaff,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async () => {
    if (updatedAdmin?.npass !== updatedAdmin?.cpass) {
      setPasswordMatchError("Passwords do not match");
      return;
    }

    const Data = new FormData();
    Data.append("name", updatedAdmin?.name);
    Data.append("email", updatedAdmin?.email);
    Data.append("phone", updatedAdmin?.phone);
    Data.append("profile", updatedAdmin?.profile);
    if (updatedAdmin?.npass) {
      Data.append("password", updatedAdmin?.npass);
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
            value={updatedAdmin?.name || ""}
          />
          <TextField
            onChange={handleChange}
            required
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="filled"
            value={updatedAdmin?.email || ""}
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
            value={updatedAdmin?.phone || ""}
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
