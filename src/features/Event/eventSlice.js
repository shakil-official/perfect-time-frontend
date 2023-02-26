import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    error: false,
    errorMessage: "",
    eventList: [],
    eventScheduleList: []
}

export const eventSlice = createSlice({
    name: 'eventWorker',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true
        },
        eventList: (state, {payload}) => {
            state.eventList = payload.data.data
        },
        eventScheduleList: (state, {payload}) => {
            state.eventScheduleList = payload.data.data
        },
        networkError: (state) => {
            state.error = true;
            state.errorMessage = "Network Error";
        },
    },
})

// Action creators are generated for each case reducer function
export const {eventList, networkError, eventScheduleList} = eventSlice.actions

export default eventSlice.reducer