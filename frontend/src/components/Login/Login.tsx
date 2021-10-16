import React from 'react'
import * as S from './styles'

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import loginHook from '@/hooks/loginHook'

function Login() {
    const { login, logout, userInfoModal, setUserInfoModal, user } = loginHook();

    const userInfoToggle = () => {
        setUserInfoModal(!userInfoModal)
    }

    const responseGoogle = async(response) => {
        const loginResult = await login(response.tokenId)
        setUserInfoModal(false)
        console.log('login: ', response);
    }

    const responseLogoutGoogle = () => {
        const logoutResult = logout()
        setUserInfoModal(false)
        console.log('Logout: ')
    }

    return(
        <>
            { user ?
            <>
                <S.CustomButton onClick={userInfoToggle}>
                    <S.LoginIcon width={'2rem'} height={'2rem'} borderRadius={'2rem'} backgroundImage={user.picture}/>
                </S.CustomButton>
                
                <S.UserInfo display={userInfoModal} width={'20rem'}>
                    <div className="title">
                        <div className="title_picture">
                            <img src={user.picture}/>
                        </div>
                        <div className="title_info">
                            <div>{user.name}</div>
                            <div>{user.email}</div>
                        </div>
                    </div>
                    <div className="menu"></div>
                    <div className="bottom">
                        <GoogleLogout
                            clientId="916373523653-i8f4llc8qb74ktav55p5fc7vmvhgp8n7.apps.googleusercontent.com"
                            onLogoutSuccess={responseLogoutGoogle}
                            buttonText="Sign out"
                        />
                    </div>
                    <button className={'close'} type="button" onClick={userInfoToggle}>close</button>
                </S.UserInfo>
            </>
            : <GoogleLogin
                clientId="916373523653-i8f4llc8qb74ktav55p5fc7vmvhgp8n7.apps.googleusercontent.com"
                render={renderProps => (
                    <S.CustomButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <S.LoginIcon width={'2rem'} height={'2rem'} borderRadius={'2rem'} />
                    </S.CustomButton>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />}
        </>
    )
}

export default Login