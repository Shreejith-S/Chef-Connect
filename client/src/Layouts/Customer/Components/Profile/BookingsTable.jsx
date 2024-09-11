import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Box, Chip, TextField, Typography } from "@mui/material";
import CancelBookings from "./Options/CancelBookings";
import BookingAction from "./Options/BookingAction";
import SubmitFeedback from "./Options/SubmitFeedback";
import GiveRatings from "./GiveRatings";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#07212e",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function BookingsTable({ data }) {
  console.log(data);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 800 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Place</StyledTableCell>
            <StyledTableCell>Cuisine</StyledTableCell>
            <StyledTableCell>Chef</StyledTableCell>
            <StyledTableCell>Charge</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length > 0 ? (
            data?.map((row, index) => {
              const formattedDate = moment(row.createdAt).format("DD-MM-YYYY");
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    <Typography variant="subtitle2">{row?.date}</Typography>
                    <Typography variant="caption">
                      booked on {formattedDate}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      rows={2}
                      fullWidth
                      value={`${row?.address},${row?.location}-${row?.city}`}
                      multiline
                      readOnly
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box>
                      <Box>
                        <Typography color="text.secondary">
                          {row?.cuisine_id?.title} / {row?.mealType}
                        </Typography>
                      </Box>
                      <Box>
                        {row?.meal?.map((item, index) => (
                          <Chip key={index} label={item} size="small" />
                        ))}
                      </Box>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    {row?.chef_id?.length > 0
                      ? row?.chef_id?.map((item, index) => (
                          <Box key={index}>
                            <Chip
                              variant="outlined"
                              sx={{ mt: 1 }}
                              key={index}
                              size="small"
                              color="secondary"
                              label={`${item?.name} | ${item?.phone}`}
                            /><GiveRatings id={item?._id}/>
                          </Box>
                        ))
                      : "Not Assigned"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row?.charge ? <>{`₹${row?.charge}`}</> : "Not charged"}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box>
                      <Box>
                        {row?.status == "Pending" ? (
                          <CancelBookings row={row} />
                        ) : row?.status == "Accepted" ? (
                          <BookingAction row={row} />
                        ) : row?.status == "Completed" ? (
                          <Chip color="success" label={row?.status} />
                        ) : (
                          <Chip color="error" label={row?.status} />
                        )}
                      </Box>
                      <Box>
                        {row?.paymentStatus ? (
                          row?.paymentStatus == "Payment initiated" ? (
                            <Chip
                              sx={{ mt: 1 }}
                              color="warning"
                              label={row?.paymentStatus}
                            />
                          ) : row?.paymentStatus == "Payment denied" ? (
                            <Chip
                              sx={{ mt: 1 }}
                              color="error"
                              label={row?.paymentStatus}
                            />
                          ) : (
                            <Chip
                              sx={{ mt: 1 }}
                              color="success"
                              label={row?.paymentStatus}
                            />
                          )
                        ) : (
                          ""
                        )}
                      </Box>
                      <Box>
                        {row?.status == "Completed" && !row?.feedback && (
                          <SubmitFeedback row={row} />
                        )}
                      </Box>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={7} align="center">
                No booking Found
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
