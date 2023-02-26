import Typography from "@mui/material/Typography";
import {Alert, Button, MenuItem, Select, Snackbar, Stack, TextField} from "@mui/material";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setName, setTimeFormat, setTimeZone, unsetAccountSuccess} from "@/features/Account/accountSlice";
import {getAccountData, updateAccountData} from "@/features/Account/AccountService";


export default function AccountAndSetting() {

    const timeZoneList = ["US/Alaska", "America/Mexico_City", "America/Bogota", "US/Eastern", "US/East-Indiana", "Asia/Tbilisi", "Asia/Dhaka", "Asia/Rangoon", "Asia/Bangkok", "Asia/Hong_Kong", "Asia/Kuala_Lumpur"];

    const dispatch = useDispatch()

    const {
        name,
        timeZone,
        timeFormat,
        accountSuccess,
        severity,
        availableTime,
        errorMessage
    } = useSelector((state) => state.accountWorker)

    useEffect(() => {
        dispatch(getAccountData())
    }, []);

    const timeZoneShow = () => {
        return timeZoneList.map((value) => {
            return (<MenuItem value={value}>{value}</MenuItem>)
        })
    }

    const handleName = (event) => {
        dispatch(setName(event.target.value))
    }

    const handleTimeZone = (event) => {
        dispatch(setTimeZone(event.target.value))
    }

    const handleTimeFormat = (event) => {
        dispatch(setTimeFormat(event.target.value))
    }

    const handleAccountUpdate = () => {
        dispatch(updateAccountData({name, timeZone, timeFormat, availableTime}))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(unsetAccountSuccess(false));
    };

    return (<>

        <Snackbar open={accountSuccess}
                  autoHideDuration={6000}
                  onClose={handleClose}>
            <Alert onClose={handleClose}
                   severity={severity}
                   sx={{width: '100%'}}>
                {errorMessage}
            </Alert>
        </Snackbar>


        <Stack spacing={2}>
            <Typography variant="h5" gutterBottom>
                User Account Setting
            </Typography>

            <TextField
                error={false}
                type="text"
                label="Name"
                value={name}
                onChange={handleName}
                variant="outlined"/>

            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Time Zone"
                variant="filled"
                value={timeZone}
                defaultValue={timeZone}
                onChange={handleTimeZone}
            >
                {timeZoneShow()}
            </Select>

            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label=""
                variant="filled"
                value={timeFormat}
                onChange={handleTimeFormat}
            >
                <MenuItem value={1}>{"am/pm"}</MenuItem>
                <MenuItem value={2}>{"24 hr"}</MenuItem>
            </Select>

            <Button variant="outlined" onClick={handleAccountUpdate}>Account Update</Button>
        </Stack>


    </>);
}
