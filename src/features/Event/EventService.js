import axios from "axios";
import {eventList, eventScheduleList} from "@/features/Event/eventSlice";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {getCookie} from "cookies-next";
import {networkError} from "@/features/Event/eventSlice";
import {unSetAuthShow} from "@/features/Login/loginSlice";


export const getEventList = (payload) => {
    return async (dispatch) => {
        axios.post(process.env.NEXT_PUBLIC_APP_API_BASE_URL + 'get/event/list', payload, {
            headers: {
                'Authorization': `Bearer ${getCookie('admin_access_token')}`
            }
        }).then((response) => {
            dispatch(eventList(response));

        }).catch((er) => {

            if (er.code == 'ERR_NETWORK') {
                dispatch(networkError(er.code));
            }


            if (er.response.status == 401) {
                dispatch(unSetAuthShow())
                return
            }


        });
    };
}

export const getEventScheduleList = (payload) => {
    return async (dispatch) => {
        axios.post(process.env.NEXT_PUBLIC_APP_API_BASE_URL + 'get/event/schedule/list', payload, {
            headers: {
                'Authorization': `Bearer ${getCookie('admin_access_token')}`
            }
        }).then((response) => {
            dispatch(eventScheduleList(response));

        }).catch((er) => {
            console.log(er)

            if (er.code == 'ERR_NETWORK') {
                dispatch(networkError(er.code));
            }


            if (er.response.status == 401) {
                dispatch(unSetAuthShow())
                return
            }


        });
    };
}





export const eventSelector = (state) => state;
