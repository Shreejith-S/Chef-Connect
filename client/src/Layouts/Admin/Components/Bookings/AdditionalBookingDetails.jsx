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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { Box, Chip, Tooltip } from "@mui/material";

const style = {
  p: 0,
  width: "100%",
  //   maxWidth: 360,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};
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

export default function AdditionalBookingDetails({ data, host }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log(data);
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            src={`${host}/uploads/customer/${data?.customer_id?.profile}`}
            aria-label={data?.customer_id?.name}
          />
        }
        title={data?.customer_id?.name}
        subheader={`${data?.phone} | ${data?.email}`}
      />
      <CardContent>
        <List sx={style} aria-label="mailbox folders">
          <ListItem>
            <ListItemText
              primary="Address"
              secondary={
                <Tooltip
                  title="click to get the location in google map"
                  arrow
                  placement="top"
                >
                  <Link
                    style={{ textDecoration: "none" }}
                    target="_black"
                    to={data?.mapLink}
                  >
                    {data?.address}, {data?.location} - {data?.city}
                  </Link>
                </Tooltip>
              }
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText primary="Message" secondary={data?.message} />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Additional"
              secondary={`People : ${data?.peopleCont} | Burner : ${data?.burnerCount}`}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Meal"
              secondary={
                <Box>
                  {data?.meal?.map((item, index) => (
                    <Chip
                      key={index}
                      label={item}
                      variant="outlined"
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  ))}
                </Box>
              }
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
