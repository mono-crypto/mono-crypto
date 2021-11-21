import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { googleAccessTokenState, authState } from '@/atoms/authState';
import { getAuth as AgetAuth } from '@/lib/api/auth/getAuth'

import authStorage from '@/lib/storage/authStorage'

import { useQueryClient } from 'react-query'
import { useWalletListQuery } from '@/hooks/query/useWalletListQuery';
import { walletItemList } from '@/atoms/walletListState';
 
export default function loginHook() {
    const queryClient = useQueryClient()
    
    const [userInfoModal, setUserInfoModal] = useState(false)
    const [, setGoogleAccessToken] = useRecoilState(googleAccessTokenState)
    const [user, setAuthState] = useRecoilState(authState)
    const [, setWalletItemListData] = useRecoilState(walletItemList)

    const { data: walletItems } = useWalletListQuery(user?.google_id, user)

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
        if(window.confirm('로그아웃 하시겠습니까?')) {
            setGoogleAccessToken(null)
            setAuthState(null)
            authStorage.clean()
            window.location.reload()
            queryClient.removeQueries(['walletList'])
        }
    }

    useEffect(()=> {
        if(walletItems) {
            setWalletItemListData(walletItems)
        }
    }, [walletItems])

    return {
        login: login,
        logout : logout,
        userInfoModal: userInfoModal,
        setUserInfoModal: setUserInfoModal,
        user: user,
    }
}