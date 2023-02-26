import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    bookingDone: false,
    error: false,
    errorMessage: "",
    timeZone: "Asia/Dhaka",
    selectSlot: 0,
    addressShow: false,
    timeOpen: false,
    slotDate: null,
    slotTime: null
}

export const publicSlice = createSlice({
    name: 'publicWorker',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true
        },
        networkError: (state) => {
            state.error = true;
            state.errorMessage = "Network Error";
            state.severity = "error";
        },
        setDate: (state, {payload}) => {
            state.slotDate = payload
        },
        setAddressShow: (state, {payload}) => {
            state.addressShow = payload
        },
        setTimeOpen: (state, {payload}) => {
            state.timeOpen = payload
        },
        setTime: (state, {payload}) => {
            state.slotTime = payload

        },
        setSelectSlot: (state, {payload}) => {
            state.selectSlot = payload
        },
        setErrorMessage: (state, {payload}) => {
            state.error = payload.type
            state.errorMessage = payload.message
        },
        setBookingDone: (state) => {
            state.bookingDone = true
        },
        setTimeZone: (state, {payload}) => {
            console.log("payload")
            console.log(payload)
            state.timeZone = payload
        },

    },
})

// Action creators are generated for each case reducer function
export const {networkError, setAddressShow, setTimeOpen, setSelectSlot, setBookingDone, setTimeZone} = publicSlice.actions

export default publicSlice.reducer



