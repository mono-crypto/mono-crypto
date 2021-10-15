import { useRecoilState } from 'recoil';

import { googleAccessTokenState, authState } from '@/atoms/authState';
import { getAuth as AgetAuth } from '@/lib/api/auth/getAuth'

import authStorage from '@/lib/storage/authStorage'

export default function loginHook() {
    const [, setGoogleAccessToken] = useRecoilState(googleAccessTokenState)
    const [user, setAuthState] = useRecoilState(authState)

    const login = async(googleAccessToken:string) => {
        try {
            const authData = await AgetAuth(googleAccessToken)
            
            if(authData) {
                setAuthState(authData)
                authStorage.set(authData)
            }
        } catch (e) {
        }
    }

    const logout = () => {
        setGoogleAccessToken(null)
        setAuthState(null)
        authStorage.clean()
    }
    return {
        'login': login,
        'logout' : logout,
        user: user
    }
}