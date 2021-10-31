import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { googleAccessTokenState, authState } from '@/atoms/authState';
import { getAuth as AgetAuth } from '@/lib/api/auth/getAuth'

import authStorage from '@/lib/storage/authStorage'

import { useQueryClient } from 'react-query'
import { useWalletListQuery } from '@/hooks/query/useWalletListQuery';
import { walletItemList } from '@/atoms/walletListState';
 
export default function loginHook() {
    
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
        const queryClient = useQueryClient()
        setGoogleAccessToken(null)
        setAuthState(null)
        authStorage.clean()
        queryClient.removeQueries(['walletList'])
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