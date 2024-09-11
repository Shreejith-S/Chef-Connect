import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import { AdminContext } from "../../Context/Context";

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

export default function InsertForm({ data }) {
  const { cuisines, getAllCUisines, insertNewChef, updateChef } =
    useContext(AdminContext);

  useEffect(() => {
    getAllCUisines();
  }, []);

  const [chefInfo, setChefInfo] = useState({
    name: "",
    phone: "",
    profile: null,
    place: "",
    foodType: "",
    cuisine_id: [],
  });
  
  useEffect(() => {
    if (data) {
      setChefInfo(data);
    }
  }, [data]);

  const [errors, setErrors] = useState({});
  const foodTypes = ["Veg", "Non-Veg", "Both"];
  const theme = useTheme();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cuisine_id") {
      setChefInfo({
        ...chefInfo,
        cuisine_id: typeof value === "string" ? value.split(",") : value,
      });
    } else if (name === "profile") {
      setChefInfo({
        ...chefInfo,
        profile: files[0],
      });
    } else {
      setChefInfo({
        ...chefInfo,
        [name]: value,
      });
    }

    if (value || files) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = chefInfo?.name ? "" : "Please enter the chef's name.";
    tempErrors.phone = chefInfo?.phone
      ? validatePhone(chefInfo.phone)
        ? ""
        : "Contact number must be exactly 10 digits."
      : "Please enter chef's contact number.";
    tempErrors.profile = chefInfo?.profile
      ? ""
      : "Please upload chef's profile picture.";
    tempErrors.place = chefInfo?.place ? "" : "Please enter chef's place.";
    tempErrors.foodType = chefInfo?.foodType
      ? ""
      : "Please select a food type.";
    tempErrors.cuisine_id = chefInfo?.cuisine_id.length
      ? ""
      : "Please select at least one cuisine.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = () => {
    if (validate()) {
      const chefData = new FormData();
      chefData.append("name", chefInfo?.name);
      chefData.append("phone", chefInfo?.phone);
      chefData.append("place", chefInfo?.place);
      chefData.append("foodType", chefInfo?.foodType);
      chefData.append("profile", chefInfo?.profile);
      chefData.append("cuisine_id", chefInfo?.cuisine_id);
      chefData.append("status", chefInfo?.status);
      if (data) {
        updateChef(data?._id, chefData);
      } else {
        insertNewChef(chefData);
      }
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{ flexGrow: 1, p: 5, backgroundColor: "#ffc7a31c" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleChange}
            name="name"
            value={chefInfo?.name}
            InputLabelProps={{ shrink: data && true }}
            label="Enter name"
            fullWidth
            autoFocus
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleChange}
            name="phone"
            value={chefInfo?.phone}
            InputLabelProps={{ shrink: data && true }}
            label="Enter contact number"
            fullWidth
            type="number"
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleChange}
            name="profile"
            InputLabelProps={{ shrink: true }}
            label="Upload profile picture"
            fullWidth
            type="file"
            error={!!errors.profile}
            helperText={errors.profile}
            inputProps={{ accept: "image/*" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleChange}
            name="place"
            value={chefInfo?.place}
            InputLabelProps={{ shrink: data && true }}
            label="Enter place"
            fullWidth
            error={!!errors.place}
            helperText={errors.place}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.foodType}>
            <InputLabel id="foodType-label">Select the food Type</InputLabel>
            <Select
              labelId="foodType-label"
              id="foodType"
              label="Select the food Type"
              onChange={handleChange}
              name="foodType"
              value={chefInfo?.foodType || ""}
            >
              {foodTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            {errors.foodType && (
              <FormHelperText>{errors.foodType}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.cuisine_id}>
            <InputLabel id="cuisines-label">Cuisines</InputLabel>
            <Select
              labelId="cuisines-label"
              id="cuisines"
              multiple
              value={chefInfo?.cuisine_id}
              name="cuisine_id"
              onChange={handleChange}
              input={<OutlinedInput label="Cuisines" />}
              MenuProps={MenuProps}
            >
              {cuisines.map((cuisine, index) => (
                <MenuItem key={index} value={cuisine._id}>
                  {cuisine.title}
                </MenuItem>
              ))}
            </Select>
            {errors.cuisine_id && (
              <FormHelperText>{errors.cuisine_id}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        {chefInfo?.status && (
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth error={!!errors.foodType}>
              <InputLabel id="foodType-label">Update Status</InputLabel>
              <Select
                labelId="foodType-label"
                id="foodType"
                label="Update Status"
                onChange={handleChange}
                name="status"
                value={chefInfo?.status || ""}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
              {errors.foodType && (
                <FormHelperText>{errors.foodType}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        )}
        <Grid item xs={12}>
          <Box textAlign="center">
            <Button
              sx={{ p: 1, backgroundColor: "#ffc7a3", color: "black" }}
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
