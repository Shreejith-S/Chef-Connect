import React from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import chef from "../../Assets/Images/chef.jpg";
const AboutContent = () => {
  return (
    <Container sx={{ p: 5 }}>
      <Grid sx={{ p: 3 }} container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Card elevation={0}>
            <CardMedia
              component="img"
              alt="Fruits"
              height="100%"
              image={chef}
              title="chef"
              sx={{ position: "relative" }}
            />
          </Card>
        </Grid>
        <Grid className="aboutContent" item xs={12} md={6}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Welcome to
          </Typography>
          <Typography
            style={{ fontWeight: "bolder" }}
            variant="h3"
            className="yourHome"
            gutterBottom
          >
            Your Home{" "}
            <span style={{ color: "#FFA500", fontWeight: "bolder" }}>
              Chef Partner
            </span>
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Discover a new way to enjoy restaurant-quality dining in the comfort
            of your home with ChefConnect. Our platform connects you with
            talented chefs who prepare exquisite meals tailored to your taste
            preferences.
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Whether it's a cozy dinner for two or a family gathering,
            ChefConnect ensures every meal is a culinary delight. Experience the
            convenience of having a personal chef at your doorstep, delivering
            hygienic and delicious meals that rival your favorite restaurants.
            Elevate your dining experience with ChefConnect
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutContent;
