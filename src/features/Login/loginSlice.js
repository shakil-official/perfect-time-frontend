import {createSlice} from '@reduxjs/toolkit'
import {deleteCookie, setCookie} from "cookies-next";
import {useRouter} from "next/router";


const initialState = {
    loading: false,
    error: false,
    errorMessage: "",
    authShow: null,
    items: [],
    openMessageBox: false,
    severity: "warning",
}

export const loginSlice = createSlice({
    name: 'userLogin',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        },
        setError: (state, {payload}) => {
            state.error = true;
            state.errorMessage = payload.data.error;
        },
        reSetError: (state) => {
            state.error = false;
            state.errorMessage = "";
        },
        userLogin: (state) => {
            // state.error = true;
        },
        logout: () => {
            deleteCookie('admin_access_token');
            const router = useRouter()
            router.push('/user/login');

        },
        networkError: (state) => {
            state.error = true;
            state.errorMessage = "Network Error";
        },
        dashboard: (state) => {
            state.authShow = true
            setTimeout(() => {
                window.location.href = "/event";
            }, 1000)
        },
        setAuthShow: (state) => {
            state.authShow = true;
        },
        unSetAuthShow: (state, {payload}) => {
            deleteCookie('admin_access_token');
            window.location.href = "/";
            state.authShow = false;
        },
        unsetMessage: (state) => {
            state.error = false;
            state.errorMessage = "";
            state.openMessageBox = false;

        },
        showMessage: (state, {payload}) => {
            state.error = payload.type;
            state.errorMessage = payload.message;
            state.severity = payload.severity;
            state.openMessageBox = true;
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setError,
    userLogin,
    unSetAuthShow,
    reSetError,
    networkError,
    dashboard,
    setAuthShow,
    showMessage,
    unsetMessage
} = loginSlice.actions

export default loginSlice.reducer