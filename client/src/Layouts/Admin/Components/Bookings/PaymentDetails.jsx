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
import { Box, Button, Chip, Tooltip } from "@mui/material";
import { useContext } from "react";
import { AdminContext } from "../../Context/Context";

const style = {
  p: 0,
  width: "100%",
  //   maxWidth: 360,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};

export default function PaymentDetails({ data, handleClosePayment }) {
  const { updatePaymentForBooking } = useContext(AdminContext);
  const updatePaymentStatus = (status) => {
    updatePaymentForBooking(data?._id, { paymentStatus: status });
    handleClosePayment();
  };
  console.log(data);
  return (
    <Card>
      <CardHeader
        title="Payment details"
        subheader="Update the payment status"
      />
      <CardContent>
        <List sx={style} aria-label="mailbox folders">
          <ListItem>
            <ListItemText primary="Amount" secondary={data?.charge} />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Transaction ID"
              secondary={data?.transactionId}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText primary="Status" secondary={data?.paymentStatus} />
          </ListItem>
        </List>
      </CardContent>
      {data?.paymentStatus != "Payment Verified" && (
        <CardActions sx={{ px: 3, mb: 2 }}>
          <Button
            onClick={() => updatePaymentStatus("Payment Denied")}
            sx={{ borderRadius: "10px" }}
            fullWidth
            color="error"
            variant="outlined"
          >
            Deny
          </Button>
          <Button
            onClick={() => updatePaymentStatus("Payment Verified")}
            sx={{ borderRadius: "10px" }}
            fullWidth
            color="success"
            variant="outlined"
          >
            Verify
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
