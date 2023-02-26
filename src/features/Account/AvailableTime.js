import React, {useState} from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {Grid, MenuItem, Select, FormControl, InputLabel} from "@mui/material";
import Format24 from "@/pages/common/layout/Format24";
import Format12 from "@/pages/common/layout/Format12";
import {setAvailableTimeStart, setAvailableTimeEnd, setAvailableDay} from "@/features/Account/accountSlice";


export default function AvailableTime() {

    const {availableTime, timeFormat} = useSelector(state => state.accountWorker);
    const dispatch = useDispatch()

    const handleTimeAndDayStart = (time, day) => {
        dispatch(setAvailableTimeStart({time: time, day: day}))
    };

    const handleTimeAndDayEnd = (time, day) => {
        dispatch(setAvailableTimeEnd({time: time, day: day}))
    };

    const handleDayChange = (event, value) => {

        dispatch(setAvailableDay({weekDay: event.target.checked, day: value}))
    };

    const weekShow = () => {
        return availableTime.hours.map((item, index) => {
            return (
                <>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={2}>
                        <FormControlLabel
                            label={item.value}
                            control={
                                <Checkbox
                                    value={availableTime.hours[index].available}
                                    checked={availableTime.hours[index].available}
                                    onChange={(event) => handleDayChange(event, index)}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={3} spacing={2}>
                        <FormControl sx={{minWidth: 220}}>
                            {timeFormat === 1 ? (
                                <Format12 defaultValue={availableTime.hours[index].data[0].start}
                                          day={index}
                                          label={"Start"}
                                          handleTimeAndDay={handleTimeAndDayStart}/>

                            ) : (
                                <Format24 defaultValue={availableTime.hours[index].data[0].start}
                                          day={index}
                                          label={"Start"}
                                          handleTimeAndDay={handleTimeAndDayStart}/>

                            )}
                        </FormControl>
                    </Grid>

                    <Grid item xs={3} spacing={0}>
                        <FormControl sx={{minWidth: 220}}>
                            {timeFormat === 1 ? (
                                <Format12 defaultValue={availableTime.hours[index].data[0].end}
                                          label={"End"}
                                          day={index} handleTimeAndDay={handleTimeAndDayEnd}/>

                            ) : (
                                <Format24 defaultValue={availableTime.hours[index].data[0].end}
                                          label={"End"}
                                          day={index} handleTimeAndDay={handleTimeAndDayEnd}/>

                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}></Grid>
                </>
            )
        })
    }


    return (
        <>
            <Grid container spacing={0} justifyContent={"center"}>
                {weekShow()}
            </Grid>

        </>
    )


}