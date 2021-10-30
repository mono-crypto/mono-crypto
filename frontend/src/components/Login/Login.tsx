import React from 'react'
import * as S from './styles'

// import { GoogleLogin, GoogleLogout } from 'react-google-login';
import loginHook from '@/hooks/loginHook'

function Login() {
    console.log('Login component')
    // const { login, logout, userInfoModal, setUserInfoModal, user } = loginHook();

    // const userInfoToggle = () => {
    //     setUserInfoModal(!userInfoModal)
    // }

    // const responseSuccessGoogle = async(response) => {
    //     await login(response.tokenId)
    //     setUserInfoModal(false)
    // }

    // const responseFailureGoogle = () => {
    //     console.log(res)
    // }

    // const responseLogoutGoogle = () => {
    //     logout()
    //     setUserInfoModal(false)
    // }

    return(
        <>
            LOGIN
        </>
    )
}

export default Login