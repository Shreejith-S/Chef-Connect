// import * as React from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import { CardActionArea } from "@mui/material";
// import { CustomerContext } from "../../Context/Context";
// import { useContext } from "react";

// export default function ChefCard({ data }) {
//   const { host } = useContext(CustomerContext);
//   console.log(data);
//   return (
//     <Card sx={{ maxWidth: 400 }}>
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           sx={{ height: { xs: 350, sm: 250 }, objectFit: "cover" }}
//           image={`${host}/uploads/customer/getImage/${data?.profile}`}
//           alt={data?.name}
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             {data?.name}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Lizards are a widespread group of squamate reptiles, with over 6,000
//             species, ranging across all continents except Antarctica
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// }
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { CustomerContext } from "../../Context/Context";
import { useContext } from "react";
import { Box, Chip, Rating } from "@mui/material";

export default function RecipeReviewCard({ data }) {
  const { host } = useContext(CustomerContext);
  const totalRating = data?.ratings?.reduce((sum, item) => sum + parseFloat(item.rating), 0);

  // Calculate the overall rating by dividing the sum by the number of ratings
  const overallRating = totalRating / data?.ratings?.length;
  return (
    <Card elevation={5}>
      <CardHeader
        title={<Typography variant="subtitle1">{data?.name}</Typography>}
        subheader={
          <Typography variant="body2" color="text.secondary">
            {data?.place}
          </Typography>
        }
      />
      <CardMedia
        component="img"
        height="360"
        image={`${host}/uploads/customer/getImage/${data?.profile}`}
        alt={data?.name}
      />
      <CardContent sx={{p:2}}>
        <Box>
          <Rating value={parseFloat(overallRating)} precision={0.5} readOnly />
        </Box>
        <Box>
          {data?.cuisine_id?.map((cus, index) => (
            <Chip key={index} label={cus?.title} size="small" />
          ))}
        </Box>
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions> */}
    </Card>
  );
}
