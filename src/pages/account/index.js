import React from "react";
import PrimarySearchAppBar from "@/pages/common/layout/AppBar";
import Container from "@mui/material/Container";
import {Grid,} from "@mui/material";
import Typography from "@mui/material/Typography";
import AccountAndSetting from "@/features/Account/AccountAndSetting";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import AvailableTime from "@/features/Account/AvailableTime";

export default function Account() {


    return (
        <>
            <PrimarySearchAppBar>
                <Container maxWidth="xl" sx={{
                    background: "white",
                    padding: "50px",
                    borderRadius: "15px",
                    marginBottom: "120px",
                    borderBottom: "1px solid #d9d2d2"
                }}>
                    <Grid container spacing={4}>
                        <Grid item xs={5}>
                            <AccountAndSetting></AccountAndSetting>

                        </Grid>
                        <Grid item xs={7}>
                            <Typography
                                variant="h5"
                                sx={{marginBottom: "25px"}}
                                gutterBottom>
                                Available Time
                            </Typography>
                            <Grid container spacing={2}>

                                <AvailableTime></AvailableTime>


                            </Grid>
                        </Grid>

                    </Grid>
                </Container>
            </PrimarySearchAppBar>

        </>
    )

}