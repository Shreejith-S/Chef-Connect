import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Button,
  TextField,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
} from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { CustomerContext } from "../../Context/Context";
import { useTheme } from "@mui/material/styles";

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

const meals = ["Breakfast", "Lunch", "Snacks", "Dinner"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BookForm({ cuisines }) {
  const { customer, loading, setLoading, book } = useContext(CustomerContext);
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [bookingInfo, setBookingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    mealType: "Vegetarian",
    cuisine_id: null,
    meal: ["Breakfast"],
    peopleCont: "",
    date: "",
    burnerCount: "1",
    location: "",
    city: "",
    address: "",
    mapLink: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setBookingInfo({
      ...bookingInfo,
      name: customer?.name,
      email: customer?.email,
      phone: customer?.phone,
      cuisine_id: cuisines[0]?._id,
    });
  }, [customer, cuisines]);

  const handleChange = (e) => {
    if (e.target.name === "meal") {
      setBookingInfo({
        ...bookingInfo,
        meal:
          typeof e.target.value === "string"
            ? e.target.value.split(",")
            : e.target.value,
      });
    } else {
      setBookingInfo({ ...bookingInfo, [e.target.name]: e.target.value });
    }
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSubmit = () => {
    const newErrors = {};
    Object.keys(bookingInfo).forEach((key) => {
      if (
        bookingInfo[key] === "" ||
        (Array.isArray(bookingInfo[key]) && bookingInfo[key].length === 0)
      ) {
        newErrors[key] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    book(bookingInfo);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleChange}
            value={bookingInfo?.name || ""}
            InputLabelProps={{ shrink: true }}
            label="Enter your name"
            placeholder="enter your name"
            name="name"
            fullWidth
            error={errors.name}
            helperText={errors.name ? "This field is required" : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleChange}
            value={bookingInfo?.email || ""}
            InputLabelProps={{ shrink: true }}
            label="Enter email"
            placeholder="enter your email"
            name="email"
            fullWidth
            error={errors.email}
            helperText={errors.email ? "This field is required" : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleChange}
            value={bookingInfo?.phone || ""}
            InputLabelProps={{ shrink: true }}
            label="Enter you contact number"
            placeholder="enter your contact number"
            name="phone"
            fullWidth
            error={errors.phone}
            helperText={errors.phone ? "This field is required" : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth error={errors.mealType}>
            <InputLabel id="demo-simple-select-label">
              Select Meal Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="mealType"
              value={bookingInfo?.mealType || ""}
              label="Select Meal Type"
              onChange={handleChange}
            >
              <MenuItem value={"Vegetarian"}>Vegetarian</MenuItem>
              <MenuItem value={"Non-Vegetarian"}>Non-Vegetarian</MenuItem>
            </Select>
            {errors.mealType && (
              <Typography variant="caption" color="error">
                This field is required
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth error={errors.cuisine}>
            <InputLabel id="demo-simple-select-label">
              Select cuisine
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="cuisine_id"
              value={bookingInfo?.cuisine_id || ""}
              label="Select cuisine"
              onChange={handleChange}
            >
              {cuisines?.map((item, index) => (
                <MenuItem value={item?._id} key={index}>
                  {item?.title}
                </MenuItem>
              ))}
            </Select>
            {errors.cuisine_id && (
              <Typography variant="caption" color="error">
                This field is required
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth error={errors.meal}>
            <InputLabel id="demo-multiple-name-label">Meal</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={bookingInfo?.meal || ""}
              onChange={handleChange}
              name="meal"
              input={<OutlinedInput label="Meal" />}
              MenuProps={MenuProps}
            >
              {meals.map((name, index) => (
                <MenuItem
                  key={index}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
            {errors.meal && (
              <Typography variant="caption" color="error">
                At least one meal must be selected
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleChange}
            value={bookingInfo?.peopleCont || ""}
            label="Enter you estimated person count"
            name="peopleCont"
            type="number"
            fullWidth
            error={errors.peopleCont}
            helperText={errors.peopleCont ? "This field is required" : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleChange}
            value={bookingInfo?.date || ""}
            label="Select the date"
            name="date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={errors.date}
            helperText={errors.date ? "This field is required" : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth error={errors.burnerCount}>
            <InputLabel id="demo-simple-select-label">
              Select number of burners
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="burnerCount"
              value={bookingInfo?.burnerCount || ""}
              label="Select number of burners"
              onChange={handleChange}
            >
              <MenuItem value={"1"}>1</MenuItem>
              <MenuItem value={"2"}>2</MenuItem>
              <MenuItem value={"3"}>3</MenuItem>
              <MenuItem value={"4"}>4</MenuItem>
              <MenuItem value={"5 or more"}>5 or more</MenuItem>
            </Select>
            {errors.burnerCount && (
              <Typography variant="caption" color="error">
                This field is required
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleChange}
            value={bookingInfo?.location || ""}
            label="Enter the location"
            placeholder="Type your location here"
            name="location"
            type="location"
            fullWidth
            error={errors.location}
            helperText={errors.location ? "This field is required" : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleChange}
            value={bookingInfo?.city || ""}
            label="Enter the city"
            placeholder="Type your city here"
            name="city"
            type="city"
            fullWidth
            error={errors.city}
            helperText={errors.city ? "This field is required" : ""}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleChange}
            value={bookingInfo?.mapLink || ""}
            label="Enter the mapLink"
            placeholder="Type or paste your location link from google map"
            name="mapLink"
            type="mapLink"
            fullWidth
            error={errors.mapLink}
            helperText={errors.mapLink ? "This field is required" : ""}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            onChange={handleChange}
            value={bookingInfo?.address || ""}
            label="Enter the address"
            placeholder="Type your address here"
            name="address"
            type="address"
            fullWidth
            multiline
            rows={2}
            error={errors.address}
            helperText={errors.address ? "This field is required" : ""}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            onChange={handleChange}
            value={bookingInfo?.message || ""}
            label="Enter the message"
            placeholder="Type your message here"
            name="message"
            type="message"
            fullWidth
            multiline
            rows={2}
            error={errors.message}
            helperText={errors.message ? "This field is required" : ""}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ backgroundColor: "#07212e", p: 1 }}
          >
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5%",
                }}
              >
                <CircularProgress size={20} />
                <Typography variant="overline">Loading</Typography>
              </Box>
            ) : (
              "Book Now"
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
