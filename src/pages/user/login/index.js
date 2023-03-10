import Head from 'next/head'
import {Inter} from '@next/font/google'
import styles from '@/styles/Home.module.css'
import {Alert, Button, Snackbar, Stack, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import LoginComponent from "@/pages/common/login/LoginComponent";
import {userLogin} from "@/features/Login/LoginService";
import {useDispatch, useSelector} from "react-redux";
import {reSetError, setError} from "@/features/Login/loginSlice";
import {getCookie} from "cookies-next";
import { useRouter } from 'next/router'


const inter = Inter({subsets: ['latin']})

export default function Home() {
    const dispatch = useDispatch()
    const router = useRouter()

    const [alertMessageOpen, setAlertMessageOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('')
    const {errorMessage, error} = useSelector((state) => state.loginUser)

    useEffect(() => {
        if (getCookie('admin_access_token') !== undefined){
            router.push('/dashboard')
        }
    },  [])


    const handleLogin = () => {
        if (email === '') {
            setAlertMessage("Email can not be empty!!")
            setAlertMessageOpen(() => true)
            return
        }
        if (password === '') {
            setAlertMessageOpen(() => true)
            setAlertMessage("Password can not be empty!!")
            return
        }

        dispatch(userLogin({
            email: email,
            password: password,
        }));
    }

    const handleEmail = (value) => {
        setEmail(() => value)
    }
    const handlePassword = (value) => {
        setPassword(() => value)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(reSetError())
    };




    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <Stack direction="column"
                       spacing={2}
                       width={"100%"}
                       height={"100vh"}
                       justifyContent={"center"}
                       alignItems={"center"}>

                    <LoginComponent title={"User Login"}
                                    handleEmail={handleEmail}
                                    alertMessageOpen={error}
                                    handleClose={handleClose}
                                    alertMessage={errorMessage}
                                    handlePassword={handlePassword}/>

                    <Button
                        onClick={handleLogin}
                        variant="outlined">Login</Button>

                </Stack>


            </main>
        </>
    )
}
