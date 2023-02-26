import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {getCookie} from "cookies-next";
import {
    networkError,
    setAvailableTime,
    setName,
    setTimeFormat,
    setTimeZone,
    updateAccount
} from "@/features/Account/accountSlice";


export const updateAccountData = (payload) => {
    return async (dispatch) => {
        axios.post(process.env.NEXT_PUBLIC_APP_API_BASE_URL + 'user/account/update', payload, {
            headers: {
                'Authorization': `Bearer ${getCookie('admin_access_token')}`
            }
        }).then((response) => {
            dispatch(updateAccount(response));
        }).catch((er) => {
            if (er.code == 'ERR_NETWORK') {
                dispatch(networkError(er.code));
            }
        });
    };
}

export const getAccountData = (payload) => {
    return async (dispatch) => {
        axios.post(process.env.NEXT_PUBLIC_APP_API_BASE_URL + 'user/account/info', payload, {
            headers: {
                'Authorization': `Bearer ${getCookie('admin_access_token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                dispatch(setName(response.data.data.name))
                dispatch(setTimeZone(response.data.data.time_zone))
                dispatch(setTimeFormat(response.data.data.time_format))
                dispatch(setAvailableTime(response.data.data.available_time))
            }
        }).catch((er) => {
            if (er.code == 'ERR_NETWORK') {
                dispatch(networkError(er.code));
            }
        });
    };
}

export const accountSelector = (state) => state;
