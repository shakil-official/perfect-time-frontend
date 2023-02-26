import {configureStore} from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import loginReducer from '../features/Login/loginSlice'
import eventReducer from '../features/Event/eventSlice'
import accountReducer from '../features/Account/accountSlice'
import publicReducer from '../features/Public/publicSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        loginUser: loginReducer,
        eventWorker: eventReducer,
        accountWorker: accountReducer,
        publicWorker: publicReducer,
    },
})