import axios from "axios";
import {networkError, setError, dashboard, setAuthShow} from "@/features/Login/loginSlice";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {setCookie} from 'cookies-next';

export const userLogin = (payload) => {

    return async (dispatch) => {
        axios.post(process.env.NEXT_PUBLIC_APP_API_BASE_URL + 'user/login', payload)
            .then((response) => {
                setCookie('admin_access_token', response.data.data.access_token)
                setCookie('expires_in', response.data.data.expires_in)
                setCookie('user_info', response.data.data.user_info)
                dispatch(setAuthShow());
                dispatch(dashboard(response));
            }).catch((er) => {
            console.log(er)
            if (er.code == 'ERR_NETWORK') {
                dispatch(networkError(er.code));
            } else {
                if (er !== undefined) {

                    dispatch(setError(er.response.data));
                }
            }
        });
    };
}

export const loginSelector = (state) => state;
