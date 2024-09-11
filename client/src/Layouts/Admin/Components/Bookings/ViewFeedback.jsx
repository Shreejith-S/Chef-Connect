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
export default function ViewFeedback({ data }) {
  console.log(data)
  return (
    <Card>
      <CardHeader
        title={data?.customer_id?.name}
        subheader={`${data?.phone} | ${data?.email}`}
      />
      <CardContent>
        <List sx={style} aria-label="mailbox folders">
          <ListItem>
            <ListItemText primary="Chefs" secondary={<Box>
              {data?.chef_id?.map((item)=>(
                <Chip size="small" label={`${item?.name} | ${item?.phone}`} />
              ))}
            </Box>} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Feedback" secondary={data?.feedback} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
