import React, { useEffect, useRef } from 'react'
import * as S from './styles'

import loginHook from '@/hooks/loginHook'
import Button from '@/components/common/Button';

function Login() {
    console.log('Login component')
    const { login, logout, userInfoModal, setUserInfoModal, user } = loginHook();

    const userInfoToggle = () => {
        setUserInfoModal(!userInfoModal)
    }

    const loginGoogle = async(user) => {
        await login(user.getAuthResponse().id_token)
        setUserInfoModal(false)
    }

    // const responseFailureGoogle = () => {
    //     console.log(res)
    // }

    const logoutGoogle = () => {
        logout()
        setUserInfoModal(false)
    }
    const loginButton = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        window.gapi.load('auth2', function() {
            const googleAuthObj = window.gapi.auth2.init({
                client_id:
                    '916373523653-i8f4llc8qb74ktav55p5fc7vmvhgp8n7.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
            })

            googleAuthObj.attachClickHandler(loginButton.current, {}, loginGoogle, () => {
                console.log('login Fail')
            })
        });
    }, [])

    return(
        <>
            {user ?
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
                            <Button onClick={logoutGoogle}>LOGOUT</Button>
                        </div>
                        <button className={'close'} type="button" onClick={userInfoToggle}>close</button>
                    </S.UserInfo>
                </>
                :
                <S.CustomButton ref={loginButton}>
                    <S.LoginIcon width={'2rem'} height={'2rem'} borderRadius={'2rem'}/>
                </S.CustomButton> 
            }
        </>
    )
}

export default Login