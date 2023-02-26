import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {getCookie} from "cookies-next";
import {networkError, setBookingDone} from "@/features/Public/publicSlice";
import {showMessage} from "@/features/Login/loginSlice";


export const slotBooking = (payload) => {
    return async (dispatch) => {
        axios.post(
            process.env.NEXT_PUBLIC_APP_API_BASE_URL + 'slot/booking',
            payload
        ).then((response) => {
            if (response.status == 200){
                dispatch(showMessage({
                    type: false,
                    message: "Thank you for your booking",
                    severity: "success",
                }))

                dispatch(setBookingDone())

            }

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
