import React, {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {getCookie} from "cookies-next";
import {eventList, networkError} from "@/features/Event/eventSlice";
import {unSetAuthShow} from "@/features/Login/loginSlice";
import {useSelector} from "react-redux";


const Slot = ({handleAvailableSlot, availableTime, selectedDate, timeZoneChange}) => {

    let start = availableTime[selectedDate.getDay()]['data'][0].start;
    let end = availableTime[selectedDate.getDay()]['data'][0].end;
    let date = selectedDate.getDate();
    let [slot, setSlot] = useState([]);

    let {timeZone} = useSelector((state) => state.publicWorker)

    const getUsedSlot = (date) => {
        axios.post(process.env.NEXT_PUBLIC_APP_API_BASE_URL + 'slot/used', {
            date: date,
            time_zone: timeZone,
        }).then((response) => {
            console.log(response.data.data);
            setSlot(() => [...response.data.data])
        });
    }

    useEffect(() => {
        console.log(timeZoneChange)
        getUsedSlot(selectedDate)
    }, [selectedDate, timeZoneChange])


    const availableSlot = [
        "12:00 AM", "1:00 AM",
        "2:00 AM", "3:00 AM",
        "4:00 AM", "5:00 AM",
        "6:00 AM", "7:00 AM",
        "8:00 AM", "9:00 AM",
        "10:00 AM", "11:00 AM",
        "12:00 PM", "1:00 PM",
        "2:00 PM", "3:00 PM",
        "4:00 PM", "5:00 PM",
        "6:00 PM", "7:00 PM",
        "8:00 PM", "9:00 PM",
        "10:00 PM", "11:00 PM",
    ];

    const dataShow = () => {


        let showData = [];
        availableSlot.map((data, index) => {
            if (start <= index && end >= index) {
                if (!slot.includes(index)) {
                    showData.push(<Button key={index}
                                          onClick={() => handleAvailableSlot(index)}
                                          variant="outlined">{data}</Button>)
                }

            }
        })

        return showData;
    }


    return (
        <>
            {dataShow()}
        </>
    )

}

export default Slot;