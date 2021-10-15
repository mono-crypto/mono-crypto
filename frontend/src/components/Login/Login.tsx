import React from 'react'
import * as S from './styles'

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import loginHook from '@/hooks/loginHook'

function Login() {
    const { login, logout, user } = loginHook();
    const responseGoogle = async(response) => {
        const loginResult = await login(response.tokenId)
        console.log('login: ', response);
    }

    const responseLogoutGoogle = () => {
        const logoutResult = logout()
        console.log('Logout: ')
    }

    return(
        <>
            { user ? <GoogleLogout
                clientId="916373523653-i8f4llc8qb74ktav55p5fc7vmvhgp8n7.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={responseLogoutGoogle}
            /> : <GoogleLogin
                clientId="916373523653-i8f4llc8qb74ktav55p5fc7vmvhgp8n7.apps.googleusercontent.com"
                render={renderProps => (
                    <S.customButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <S.LoginIcon width={'2rem'} height={'2rem'}/>
                    </S.customButton>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />}
        </>
    )
}

export default Login