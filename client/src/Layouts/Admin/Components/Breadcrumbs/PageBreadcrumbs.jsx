import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box } from "@mui/material";

export default function PageBreadcrumbs({
  firstTitle,
  isLink,
  isSecond,
  secondTitle,
  isThird,
  thirdTitle,
  secondPath,
}) {
  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link key="1" style={{ color: "black", textDecoration: "none" }}>
          {firstTitle}
        </Link>
        {isSecond && (
          <Box>
            {isLink ? (
              <Link
                to={secondPath}
                style={{ color: "black", textDecoration: "none" }}
              >
                {secondTitle}
              </Link>
            ) : (
              <Typography key="3" color="text.primary">
                {secondTitle}
              </Typography>
            )}
          </Box>
        )}

        {isThird && (
          <Typography key="3" color="text.primary">
            {thirdTitle}
          </Typography>
        )}
      </Breadcrumbs>
    </Stack>
  );
}
