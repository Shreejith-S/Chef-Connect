import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext } from "react";
import { CustomerContext } from "../../Context/Context";
import { Box } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CuisineCard({ data }) {
  const { host } = useContext(CustomerContext);
  console.log(data);

  return (
    <Card>
      <CardMedia
        component="img"
        sx={{ height: { xs: 150, sm: 250 }, objectFit: "cover" }}
        image={`${host}/uploads/customer/getImage/${data?.picture}`}
        alt={data?.title}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="overline" color="text.secondary">
          {data?.title}
        </Typography>
      </Box>
    </Card>
  );
}
