import { useRecoilState } from 'recoil'
import { authState } from '@/atoms/authState'
import { useMutation, useQueryClient } from 'react-query'
import { addWalletList as AaddWalletItem } from '@/lib/api/wallet/addWalletList'
import { addWalletItem as TaddWalletItem } from '@/lib/api/types'
import { useEffect } from 'react'
import { useConinList } from '@/atoms/coinListState'

import useCoinListQuery from '@/hooks/query/useCoinListQuery'

export function coinListModalHook() {
    const queryClient = useQueryClient() 
    
    const [user] = useRecoilState(authState)
    const [, setCoinList] = useConinList()
    // const [inputValue, setInputValue, onChangeEvent] = useInputChangeHook()
    const {isLoading:coinIsLoading, data:coinData, error:coinDataError} = useCoinListQuery();

    const mutation = useMutation((addWalletItemData:TaddWalletItem) => (AaddWalletItem(addWalletItemData)), {
        onSuccess: () => {
            queryClient.invalidateQueries('walletList')
        }
    })

    useEffect(()=> {
        if(coinData) {
            setCoinList(coinData)
        }
    },[coinData])

    return {
        mutation: mutation,
        user: user,
    }
}