import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useState } from "react";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { AdminContext } from "../../Context/Context";

export default function InsertForm() {
  const { insertNewCuisine } = useContext(AdminContext);
  const [open, setOpen] = useState(false);
  const [cuisineInfo, setCuisineInfo] = useState({ title: "", picture: null });
  const [error, setError] = useState({ title: "", picture: "" });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture") {
      setError((prev) => ({ ...prev, [name]: "" }));
      setCuisineInfo((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setCuisineInfo((prev) => ({ ...prev, [name]: value }));
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleInsert = () => {
    if (cuisineInfo.title === "") {
      setError((prev) => ({ ...prev, title: "Please enter a title" }));
    } else if (cuisineInfo.picture === null) {
      setError((prev) => ({ ...prev, picture: "Please upload a picture" }));
    } else {
      // Handle the actual insert logic here
      const CuisineData = new FormData();
      CuisineData.append("title", cuisineInfo.title);
      CuisineData.append("picture", cuisineInfo.picture);
      insertNewCuisine(CuisineData);
      setCuisineInfo({ title: "", picture: null });
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <Button
        startIcon={<AddBoxIcon />}
        variant="outlined"
        sx={{ color: "black", border: "1px solid black" }}
        onClick={handleClickOpen}
      >
        <Typography sx={{ display: { xs: "none", sm: "contents" } }}>
          Insert New
        </Typography>
      </Button>

      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Insert New Cuisine</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name and upload picture of the cuisine you want to
            add
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Enter Title"
            fullWidth
            variant="standard"
            onChange={handleChange}
            error={!!error.title}
            helperText={error.title}
          />
          <TextField
            required
            margin="dense"
            id="picture"
            name="picture"
            label="Upload Picture"
            InputLabelProps={{ shrink: true }}
            fullWidth
            type="file"
            variant="standard"
            onChange={handleChange}
            error={!!error.picture}
            helperText={error.picture}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleInsert}>Insert</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
