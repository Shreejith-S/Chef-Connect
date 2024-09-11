import { Box } from "@mui/material";
import React from "react";
import ProfileContent from "../Components/Profile/ProfileContent";

export default function Profile() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <ProfileContent />
      </Box>
    </Box>
  );
}
