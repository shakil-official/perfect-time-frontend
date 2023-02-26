import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React from "react";

export default function Format24({defaultValue, day, handleTimeAndDay, label}) {

    const handleTime = (event) => {
        handleTimeAndDay(event.target.value, day)
    }

    return (
        <>
            <FormControl sx={{m: 1, minWidth: 120}}>
                <InputLabel id="hour-12-label">{label}</InputLabel>
                <Select
                    labelId="hour-12-label"
                    id="hour-12"
                    label={label}
                    onChange={handleTime}
                    value={defaultValue}
                    defaultValue={defaultValue}
                >
                    <MenuItem value={0}>12:00 AM</MenuItem>
                    <MenuItem value={1}>1:00 AM</MenuItem>
                    <MenuItem value={2}>2:00 AM</MenuItem>
                    <MenuItem value={3}>3:00 AM</MenuItem>
                    <MenuItem value={4}>4:00 AM</MenuItem>
                    <MenuItem value={5}>5:00 AM</MenuItem>
                    <MenuItem value={6}>6:00 AM</MenuItem>
                    <MenuItem value={7}>7:00 AM</MenuItem>
                    <MenuItem value={8}>8:00 AM</MenuItem>
                    <MenuItem value={9}>9:00 AM</MenuItem>
                    <MenuItem value={10}>10:00 AM</MenuItem>
                    <MenuItem value={11}>11:00 AM</MenuItem>
                    <MenuItem value={12}>12:00 PM</MenuItem>
                    <MenuItem value={13}>1:00 PM</MenuItem>
                    <MenuItem value={14}>2:00 PM</MenuItem>
                    <MenuItem value={15}>3:00 PM</MenuItem>
                    <MenuItem value={16}>4:00 PM</MenuItem>
                    <MenuItem value={17}>5:00 PM</MenuItem>
                    <MenuItem value={18}>6:00 PM</MenuItem>
                    <MenuItem value={19}>7:00 PM</MenuItem>
                    <MenuItem value={20}>8:00 PM</MenuItem>
                    <MenuItem value={21}>9:00 PM</MenuItem>
                    <MenuItem value={22}>10:00 PM</MenuItem>
                    <MenuItem value={23}>11:00 PM</MenuItem>
                </Select>
            </FormControl>

        </>
    )
}
