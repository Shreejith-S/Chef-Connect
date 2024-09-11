import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Chip } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useContext } from 'react';
import { CustomerContext } from '../../Context/Context';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
export default function GiveRatings({ id }) {
    const {RateChef}=useContext(CustomerContext)
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        RateChef(id,{rating:value})
        setOpen(false);
    };
    // console.log(id)
    return (
        <div>
            <Chip onClick={handleClickOpen} icon={<StarBorderIcon />} variant='outlined' label="Give Rating" size='small' sx={{ my: 1 }} color='warning' />
            <Dialog fullWidth
                open={open}
                onClose={handleClose}
                component={"form"}
                onSubmit={handleSubmit}
            >
                <DialogTitle>Rate the chef's service</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Rate the chef's service to improve service
                    </DialogContentText>
                    <Box
                        sx={{
                            // width: 200,
                            display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            alignItems: "center", p: 3
                        }}
                    >
                        <Rating
                        size="large"
                            name="hover-feedback"
                            value={value}
                            precision={0.5}
                            getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        {value !== null && (
                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
