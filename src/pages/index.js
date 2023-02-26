import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import {Button, Stack} from "@mui/material";
import { useRouter } from 'next/router'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import {useState} from "react";

export default function Home() {

    const router = useRouter()
    const [dateGet, setDateGet] = useState(new Date());
    const minDate = new Date(); // set minimum date to today

    const isWeekend = (date) => {
        const day = date.getDay();
        // console.log("rr")
        // console.log(day === 0)
        // console.log("rr")


        return day === 0 || day === 3 || day === 6; // Sunday or Saturday
    };
    const tileDisabled = ({ date }) => {
        return isWeekend(date);
    };

    // Mark specific dates with a dot
    const markedDates = [
        new Date('2023-03-24'),
        new Date('2023-02-25'),
        new Date('2023-02-27'),
        new Date('2023-02-28'),
    ];
    const stileContent = ({ date, view }) => {
        if (view === 'month' && markedDates.some(d => d.getTime() === date.getTime())) {
            return <div className="dot"> lol</div>;
        }
    };

    const tileContent = ({ date, view }) => {



        if (view === "month") {

            if (1 == date.getMonth()){
                if (24 === date.getDate()){
                    date.getDay()
                    return <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor:" #0071ff", margin: "0 auto", marginTop: "2px", }}></div>;
                }

                if (4 === date.getDate()){
                    return <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor:" #fbff00", margin: "0 auto", marginTop: "2px", }}></div>;
                }

                if (2 === date.getDate()){
                    return <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor:" #6dec12", margin: "0 auto", marginTop: "2px", }}></div>;
                }
            }


        }
        return <div></div>;
    };


    console.log(dateGet)

    return (
        <>
            <Head>
                <title>Perfect time</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>

                <Stack direction="column" spacing={2} width={"100%"} height={"100vh"} justifyContent={"center"}
                       alignItems={"center"}>
                    <div>
                        <h1>Welcome to Perfect Time</h1>
                        {/*<Counter/>*/}
                    </div>
                    <Button onClick={() => router.push('/user/login')} variant="outlined">User Login</Button>
                    <Button onClick={() => router.push('/signup')} variant="outlined">User Signup</Button>
                </Stack>
            </main>
        </>
    )
}
