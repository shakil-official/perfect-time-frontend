import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react';
import styles from "@/styles/Home.module.css";
import Container from "@mui/material/Container";
import {Alert, Grid, InputLabel, makeStyles, MenuItem, Select, Snackbar, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import Slot from "@/pages/common/layout/Slot";
import Address from "@/features/Public/Address";
import DetailsShow from "@/features/Public/DetailsShow";
import {slotBooking,} from "@/features/Public/PublicService";
import {useDispatch, useSelector} from "react-redux";
import {setAddressShow, setSelectSlot, setTimeOpen, setTimeZone} from "@/features/Public/publicSlice";
import {isEmailAddress} from "@/pages/common/helper/Helper";
import {showMessage, unsetMessage} from "@/features/Login/loginSlice";
import {styled} from '@material-ui/core/styles';


const CenterText = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
});

const timeZoneList = ["US/Alaska", "America/Mexico_City", "America/Bogota", "US/Eastern", "US/East-Indiana", "Asia/Tbilisi", "Asia/Dhaka", "Asia/Rangoon", "Asia/Bangkok", "Asia/Hong_Kong", "Asia/Kuala_Lumpur"];


const Slug = ({initData}) => {
    const [firstLoad, setFirstLoad] = useState(true)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [dateGet, setDateGet] = useState(new Date());
    const minDate = new Date(); // set minimum date to today
    const dispatch = useDispatch();

    let {selectSlot, timeOpen, addressShow, bookingDone, timeZone} = useSelector((state) => state.publicWorker)
    let {errorMessage, openMessageBox, severity} = useSelector((state) => state.loginUser)


    useEffect(() => {

        if (initData.error) {
            setLoading(false);
            setError(() => true)
        }

        if (!initData.error) {
            setLoading(false);
            setError(() => true)
        }

    }, []);





    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(() => false)
        }

        if (!firstLoad) {
            dispatch(setTimeOpen(true))
        }


    }, [dateGet])


    const timeZoneShow = () => {
        return timeZoneList.map((value) => {
            return (<MenuItem value={value}>{value}</MenuItem>)
        })
    }


    if (initData.error) {
        return (
            <div className={styles.main} style={{minHeight: "100vh"}}>
                <CenterText>
                    <Typography variant="h5" gutterBottom>Nothing found</Typography>
                </CenterText>
            </div>
        );
    }


    if (loading) {
        return (
            <div className={styles.main} style={{minHeight: "100vh"}}>
                <Backdrop
                    sx={{color: '#c06464'}}
                    open={true}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
                <CenterText>
                    <Typography variant="h5" gutterBottom>Please wait a few min </Typography>
                </CenterText>
            </div>
        );
    }

    const isWeekend = (date) => {
        const day = date.getDay();
        return !initData.data.available_day.includes(day); // will return true false
    };
    const tileDisabled = ({date}) => {
        return isWeekend(date);
    };

    const tileContent = ({date, view}) => {
        if (view === "month") {
            if (1 == date.getMonth()) {
            }
        }
        return <div></div>;
    }

    const handleAvailableSlot = (value) => {
        dispatch(setSelectSlot(value))
        dispatch(setAddressShow(true))
    }

    const handleAddress = (name, email) => {

        if (name == '') {
            dispatch(showMessage({
                type: false,
                message: "Name can not be empty",
                severity: "warning",
            }))
            return
        }

        if (!isEmailAddress(email)) {
            dispatch(showMessage({
                type: false,
                message: "Please provide valid message",
                severity: "warning",
            }))
            return
        }


        dispatch(slotBooking({
            name: name,
            email: email,
            time_zone: timeZone,
            current_date: dateGet,
            select_slot: selectSlot,
            user_id: initData.data.user.id,
        }))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(unsetMessage());
    };

    const handleTimeZone = (event) => {
        dispatch(setTimeZone(event.target.value))
    }

    return (
        <>
            <main className={styles.main}>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                    open={openMessageBox}
                    autoHideDuration={3000}
                    onClose={handleClose}>
                    <Alert onClose={handleClose}
                           severity={severity}
                           sx={{width: '100%'}}>
                        {errorMessage}
                    </Alert>
                </Snackbar>

                {
                    !bookingDone ?

                        <Container
                            maxWidth="xl" sx={{
                            background: "white",
                            padding: "50px",
                            borderRadius: "15px",
                            marginBottom: "220px",
                            marginTop: "100px",
                            borderBottom: "1px solid #d9d2d2"
                        }}>
                            <Grid container spacing={5}>
                                <Grid item xs={5}>
                                    <Stack spacing={2}>
                                        <DetailsShow initData={initData}/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={6}>
                                    {
                                        !addressShow && <Grid container spacing={2}>
                                            <Grid item xs={7}>

                                                <Typography variant="h6" gutterBottom> Select a Date & Time</Typography>

                                                <Calendar
                                                    onChange={setDateGet}
                                                    value={dateGet}
                                                    tileDisabled={tileDisabled}
                                                    tileContent={tileContent}
                                                    minDate={minDate}
                                                />

                                                <Typography variant="h6" gutterBottom>Time Zone</Typography>

                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Time Zone"
                                                    variant="outlined"
                                                    value={timeZone}
                                                    defaultValue={"Asia/Dhaka"}
                                                    onChange={handleTimeZone}
                                                >
                                                    {timeZoneShow()}
                                                </Select>

                                            </Grid>
                                            <Grid item xs={5}>
                                                <Stack
                                                    spacing={2}
                                                    sx={{overflowY: "auto", height: "calc(100vh - 500px)"}}>

                                                    {timeOpen ?
                                                        <Slot
                                                            availableTime={initData.data.available_day_list}
                                                            selectedDate={dateGet}
                                                            handleAvailableSlot={handleAvailableSlot}>
                                                        </Slot>
                                                        :
                                                        ""}
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    }


                                    {addressShow &&
                                        <>
                                            <Typography
                                                variant="h5"
                                                gutterBottom>
                                                Please share your address
                                            </Typography>
                                            <Address
                                                handleAddress={handleAddress}>
                                            </Address>
                                        </>
                                    }
                                </Grid>
                            </Grid>
                        </Container>
                        : (
                            <CenterText>
                                <Typography variant="h5" gutterBottom>Thanks you for your booking </Typography>
                            </CenterText>
                        )
                }
            </main>
        </>
    );

}


export async function getServerSideProps(context) {

    const slugData = context.query.slug !== undefined ? context.query.slug : null;

    const response = await fetch(process.env.NEXT_PUBLIC_APP_API_BASE_URL + 'user/slug/info', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            slug: slugData,
        }),
    });

    const reviewData = await response.json();

    const initData = {
        slugData: slugData,
        error: reviewData.status == 400 ? true : false,
        data: reviewData.data
    };


    return {
        props: {
            initData
        },
    };
}

export default Slug;