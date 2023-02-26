import {
    Alert, Button, Grid, InputLabel, MenuItem, Select, Snackbar, Stack, TextField
} from "@mui/material";
import styles from "@/styles/Home.module.css";
import Container from '@mui/material/Container';
import {useEffect, useState} from "react";
import PrimarySearchAppBar from "@/pages/common/layout/AppBar";
import axios from "axios";
import {getCookie, setCookie} from 'cookies-next';
import Typography from "@mui/material/Typography";
import EventList from "@/features/Event/EventList";
import {useDispatch, useSelector} from "react-redux";
import {fetchItems} from "@/features/counter/CounterService";
import {getEventList, getEventScheduleList} from "@/features/Event/EventService";
import {convertSlugFromStr, isEmailAddress} from "@/pages/common/helper/Helper";
import {unSetAuthShow} from "@/features/Login/loginSlice";
import {styled} from '@material-ui/core/styles';


const CenterText = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
    marginLeft: "70px"
});


export default function Event() {

    const UrlBasic = process.env.NEXT_PUBLIC_APP_API_BASE_URL_FOR_FRONT

    const dispatch = useDispatch()
    /**    event list work start  **/

    const {eventList, eventScheduleList} = useSelector((state) => state.eventWorker)

    useEffect(() => {
        dispatch(getEventList())
        dispatch(getEventScheduleList())
    }, [])

    /**    event list work end  **/


    const [contactType, setContactType] = useState(1);
    const [eventName, setEventName] = useState("");
    const [eventNameError, setEventNameError] = useState(false);
    const [eventContact, setEventContact] = useState("");
    const [contactError, setContactError] = useState(false);
    const [eventDescription, setEventDescription] = useState('');
    const [eventDescriptionError, setEventDescriptionError] = useState(false);
    const [eventSlug, setEventSlug] = useState('');
    const [eventSlugError, setEventSlugError] = useState(false);
    const [alertMessageOpen, setAlertMessageOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('')

    const handleContactType = (event) => {
        setContactType(event.target.value);
    }

    const eventType = () => {

        if (1 == contactType) {
            return ["text", "Please enter a phone number"];
        }

        if (2 == contactType) {
            return ["email", "Please enter a email"];
        }

        if (3 == contactType) {
            return ["text", "Please enter a meet link"];
        }

        setContactError(false)

    }


    const handleContact = (event) => {
        setEventContact(event.target.value)


        if (2 == contactType) {
            if (!isEmailAddress(event.target.value)) {
                setContactError(true)
                return
            }
        }

        setContactError(false)
        // isEmailAddress
    }


    const convertSlug = (value) => {
        let slug = convertSlugFromStr(value)
        setEventSlug(slug)
    }

    const eventValidationn = () => {
        if (eventName === '') {
            setEventNameError(true);
            setTimeout(() => {
                setEventNameError(false);
            }, 3000)
            return false;
        }

        if (contactType === 2) {
            if (eventContact === '') {
                setContactError(true);
                setTimeout(() => {
                    setContactError(false);
                }, 3000)
                return false;
            }

            if (!isEmailAddress(eventContact)) {
                setContactError(true);
                setTimeout(() => {
                    setContactError(false);
                }, 3000)
                return false;
            }
        }

        if (eventContact === '') {
            setContactError(true);
            setTimeout(() => {
                setContactError(false);
            }, 3000)
            return false;
        }


        if (eventDescription === '') {
            setEventDescriptionError(true);
            setTimeout(() => {
                setEventDescriptionError(false);
            }, 3000)
            return false;
        }


        if (eventSlug === '') {
            setEventSlugError(true);
            setTimeout(() => {
                setEventSlugError(false);
            }, 3000)
            return false;
        }

        return true;
    }

    const handleEvent = () => {

        if (!eventValidationn()) {
            return false;
        }

        axios.post(process.env.NEXT_PUBLIC_APP_API_BASE_URL + 'create/event', {
            eventName: eventName,
            contactType: contactType,
            eventContact: eventContact,
            eventDescription: eventDescription,
            eventSlug: eventSlug,
        }, {
            headers: {
                'Authorization': `Bearer ${getCookie('admin_access_token')}`
            }
        }).then((response) => {
            if (response.data.status == 201) {
                setAlertMessageOpen(true)
                setAlertMessage(response.data.message)
                setEventName('')
                setEventSlug('')
                setEventDescription('')
                setEventContact('')
                dispatch(getEventList())
                return
            }
        }).catch((er) => {
            if (er.code == 'ERR_NETWORK') {
                setAlertMessageOpen(() => true)
                setAlertMessage(() => "Please check your network")
                return
            }

            if (er.response.data.status == 422) {
                setAlertMessageOpen(true)
                setAlertMessage(er.response.data.message)
                return
            }

            if (er.response.data.status == 401) {
                dispatch(unSetAuthShow())
                return
            }


        });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertMessageOpen(false)
    };

    const getEventListShow = () => {
        if (eventList.length == 0) {
            return (
                <CenterText>
                    <Typography variant="h2" component="h5">
                        Event not create yet !!
                    </Typography>
                </CenterText>

            )
        }


        return eventList.map((item) => {
            return (
                <Grid item xs={12}>
                    <EventList title={item.name}
                               description={item.description}/>
                    <Button onClick={() => {
                        navigator.clipboard.writeText( UrlBasic + 'p/' + item.slug)
                        setAlertMessageOpen(true)
                        setAlertMessage("Slug Copy")
                    }}>Copy</Button>
                </Grid>
            )
        })
    }


    const bookingFormat = (email, date) => {

        return (
            <Typography>   { email } || Date : {date}   </Typography>
        )

    }

    const getEventSchduleListShow = () => {
        if (eventScheduleList.length == 0) {
            return (
                <CenterText>
                    <Typography variant="h2" component="h5">
                        Event not create yet !!
                    </Typography>
                </CenterText>

            )
        }

        return eventScheduleList.map((item) => {
            return (
                <Grid item xs={12}>
                    <EventList title={ "Name : " +  item.name}
                               description={bookingFormat(item.email, item.booking_date)}/>
                </Grid>
            )
        })
    }


    return (

        <PrimarySearchAppBar>

            <Snackbar open={alertMessageOpen}
                      autoHideDuration={6000}
                      onClose={handleClose}>
                <Alert onClose={handleClose}
                       severity="success"
                       sx={{width: '100%'}}>
                    {alertMessage}
                </Alert>
            </Snackbar>

            <Container maxWidth="xl" sx={{
                background: "white",
                padding: "50px",
                borderRadius: "15px",
                marginBottom: "120px",
                borderBottom: "1px solid #d9d2d2"
            }}>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <Stack spacing={2}>
                            <Typography variant="h5" gutterBottom>
                                Create Event
                            </Typography>

                            <TextField
                                error={eventNameError}
                                type="text"
                                value={eventName}
                                label="Event name *"
                                onChange={(event) => {
                                    setEventName(event.target.value);
                                }}
                                variant="outlined"/>


                            <Select
                                id="demo-simple-select"
                                value={contactType}
                                label="Contact"
                                onChange={handleContactType}
                                variant="standard"
                            >
                                <MenuItem value={1}>Phone</MenuItem>
                                <MenuItem value={2}>Email</MenuItem>
                                <MenuItem value={3}>Meet Link</MenuItem>
                            </Select>

                            <TextField
                                error={contactError}
                                value={eventContact}
                                type={eventType()[0]}
                                label={eventType()[1]}
                                onChange={handleContact}
                                variant="outlined"/>

                            <TextField
                                id=""
                                value={eventDescription}
                                error={eventDescriptionError}
                                label="Description/Instructions"
                                multiline
                                rows={6}
                                maxRows={8}
                                variant="outlined"
                                onChange={(event) => {
                                    setEventDescription(event.target.value);
                                }}

                            />

                            <InputLabel id="demo-multiple-chip-label">http://domain.com/{eventSlug}</InputLabel>

                            <TextField
                                error={eventSlugError}
                                type="text"
                                value={eventSlug}
                                label="Event slug* "
                                onChange={(event) => {
                                    convertSlug(event.target.value)
                                }}
                                variant="outlined"/>

                            <Button
                                onClick={handleEvent}
                                variant="outlined">Create Event</Button>
                        </Stack>
                    </Grid>

                    <Grid item xs={4}>
                        <Typography variant="h5" gutterBottom>
                            Event List
                        </Typography>
                        <Grid container spacing={2}>
                            {getEventListShow()}

                        </Grid>
                    </Grid>

                    <Grid item xs={4}>
                        <Typography variant="h5" gutterBottom>
                            Schedule Booking List
                        </Typography>
                        <Grid container spacing={2}>
                            {getEventSchduleListShow()}
                        </Grid>
                    </Grid>

                </Grid>
            </Container>

        </PrimarySearchAppBar>)


}