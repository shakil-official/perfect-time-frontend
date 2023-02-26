import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: 0,
    loading: false,
    error: false,
    items: [],
    errorMessage: '',
    messageBox: false
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },

        setLoading: (state) => {
            state.loading = true;
        },
        setItems: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.items = payload;
        },
        setError: (state, {payload}) => {
            state.error = true;
            state.message = payload.message;
        },
    },
})

// Action creators are generated for each case reducer function
export const {increment, decrement, setItems, setError} = counterSlice.actions

export default counterSlice.reducer