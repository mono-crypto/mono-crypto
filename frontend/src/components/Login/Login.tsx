import React from 'react'
import * as S from './styles'

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import loginHook from '@/hooks/loginHook'

function Login() {
    console.log('Login component')
    const { login, logout, userInfoModal, setUserInfoModal, user } = loginHook();

    const userInfoToggle = () => {
        setUserInfoModal(!userInfoModal)
    }

    const responseSuccessGoogle = async(response) => {
        await login(response.tokenId)
        setUserInfoModal(false)
    }

    const responseFailureGoogle = (res) => {
        console.log(res)
    }

    const responseLogoutGoogle = () => {
        logout()
        setUserInfoModal(false)
    }

    return(
        <>  
            { user ?
                <>
                    <S.CustomButton onClick={userInfoToggle}>
                        <S.LoginIcon width={'2rem'} height={'2rem'} borderRadius={'2rem'} backgroundImage={user.picture}/>
                    </S.CustomButton>
                    
                    <S.UserInfo display={userInfoModal ? 1 : 0} width={'20rem'}>
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
                </> :
                <GoogleLogin
                    clientId="916373523653-i8f4llc8qb74ktav55p5fc7vmvhgp8n7.apps.googleusercontent.com"
                    render={renderProps => (
                        <S.CustomButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <S.LoginIcon width={'2rem'} height={'2rem'} borderRadius={'2rem'} />
                        </S.CustomButton>
                    )}
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseFailureGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            }
        </>
    )
}

export default Login