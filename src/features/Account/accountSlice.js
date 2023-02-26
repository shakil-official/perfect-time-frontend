import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    error: false,
    accountSuccess: false,
    errorMessage: "",
    name: "",
    timeZone: "",
    timeFormat: 1,
    severity: "success",
    availableTime: {
        "hours":
            [
                {
                    value: "Sunday",
                    data: [{"start": 9, "end": 15}],
                    available: true
                },
                {
                    value: "Monday",
                    data: [{"start": 9, "end": 15}],
                    available: false,
                },
                {
                    value: "Tuesday",
                    data: [{"start": 9, "end": 15}],
                    available: false,
                },
                {
                    value: "Wednesday",
                    data: [{"start": 9, "end": 15}],
                    available: true,
                },
                {
                    value: "Thursday",
                    data: [{"start": 9, "end": 15}],
                    available: true,
                },
                {
                    value: "Friday",
                    data: [{"start": 9, "end": 15}],
                    available: true,
                },
                {
                    value: "Saturday",
                    data: [{"start": 9, "end": 15}],
                    available: true,
                }
            ]
    }
}

export const accountSlice = createSlice({
    name: 'accountWorker',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true
        },
        updateAccount: (state, {payload}) => {
            state.accountSuccess = true;
            state.severity = "success";
            state.errorMessage = "Account update successfully";
        },
        networkError: (state) => {
            state.error = true;
            state.errorMessage = "Network Error";
            state.severity = "error";

        },
        setName: (state, {payload}) => {
            state.name = payload
        },
        setTimeZone: (state, {payload}) => {
            console.log(payload)
            state.timeZone = payload
            console.log(state.timeZone)
        },
        setTimeFormat: (state, {payload}) => {
            state.timeFormat = payload
        },
        unsetAccountSuccess: (state) => {
            state.accountSuccess = false;
            state.severity = ""
            state.errorMessage = ""
        },
        setAvailableTimeStart: (state, {payload}) => {
            state.availableTime.hours[payload.day].data[0].start = payload.time
        },
        setAvailableTimeEnd: (state, {payload}) => {
            state.availableTime.hours[payload.day].data[0].end = payload.time
        },
        setAvailableDay: (state, {payload}) => {
            state.availableTime.hours[payload.day].available = payload.weekDay
        },
        setAvailableTime: (state, {payload}) => {
            console.clear()
            console.group("setAvailableTime")
            console.log(JSON.parse(payload))
            state.availableTime.hours = JSON.parse(payload).hours
            console.groupEnd()

        },

    },
})

// Action creators are generated for each case reducer function
export const {
    updateAccount,
    setName,
    setTimeZone,
    setTimeFormat,
    networkError,
    setAvailableTimeStart,
    setAvailableTimeEnd,
    setAvailableDay,
    setAvailableTime,
    unsetAccountSuccess
} = accountSlice.actions

export default accountSlice.reducer



