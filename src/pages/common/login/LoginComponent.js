import {Inter} from '@next/font/google'
import styles from '@/styles/Home.module.css'
import {Alert, Button, Snackbar, Stack, TextField} from "@mui/material";
import {useState} from "react";

const inter = Inter({subsets: ['latin']})

export default function LoginComponent({
                                           title,
                                           handleEmail,
                                           handlePassword,
                                           alertMessageOpen,
                                           handleClose,
                                           alertMessage
                                       }) {


    return (
        <>
            <Snackbar open={alertMessageOpen}
                      autoHideDuration={6000}
                      onClose={handleClose}>
                <Alert onClose={handleClose}
                       severity="warning"
                       sx={{width: '100%'}}>
                    {alertMessage}
                </Alert>
            </Snackbar>

            <div>
                <h1>{title}</h1>
            </div>
            <TextField
                type="email"
                label="Email"
                onChange={(event) => {
                    handleEmail(event.target.value);
                }}
                variant="outlined"/>
            <TextField
                label="Password"
                type="password"
                onChange={(event) => {
                    handlePassword(event.target.value);
                }}
                variant="outlined"/>
        </>
    )
}
