import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import {useState} from "react";

export default function Address({handleAddress}) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    return (
        <>
            <Box component="form"
                 sx={{
                     '& > :not(style)': {m: 1, width: '25ch'},
                 }}
                 noValidate
                 autoComplete="off"
            >
                <TextField type={"text"}
                           id="address-name"
                           label="Name"
                           variant="outlined"
                           onChange={(event) => setName(event.target.value)}
                           size="small"/>
                <TextField type={"email"}
                           id="address-email"
                           label="Email"
                           variant="outlined"
                           onChange={(event) => setEmail(event.target.value)}
                           size="small"/>

                <Button variant="outlined" size="large" onClick={() => handleAddress(name, email)}>Booking</Button>
            </Box>

        </>
    );
}