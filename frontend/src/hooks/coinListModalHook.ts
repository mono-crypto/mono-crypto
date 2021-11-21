import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { authState } from '@/atoms/authState'
import { useMutation, useQueryClient } from 'react-query'
import { addWalletList as AaddWalletItem } from '@/lib/api/wallet/addWalletList'
import { addWalletItem as TaddWalletItem } from '@/lib/api/types'
import { updateWalletItem as AupdateWalletItem } from '@/lib/api/wallet/updateWalletItem'
import { updateWalletItem as TupdateWalletItem } from '@/lib/api/types'
import { useConinList } from '@/atoms/coinListState'

import useCoinListQuery from '@/hooks/query/useCoinListQuery'

export function coinListModalHook() {
    const queryClient = useQueryClient() 
    
    const [user] = useRecoilState(authState)
    const [, setCoinList] = useConinList()
    const {isLoading:coinIsLoading, data:coinData, error:coinDataError} = useCoinListQuery();

    const addMutation = useMutation((addWalletItemData:TaddWalletItem) => (AaddWalletItem(addWalletItemData)), {
        onSuccess: (data, params) => {
            queryClient.invalidateQueries('walletList')
            queryClient.invalidateQueries(['walletItemHistory', params.ticker])
        }
    })

    const updateMutation = useMutation((addWalletItemData:TupdateWalletItem) => (AupdateWalletItem(addWalletItemData)), {
        onSuccess: (data, params) => {
            queryClient.invalidateQueries('walletList')
            queryClient.invalidateQueries(['walletItemHistory', params.ticker])
        }
    })

    useEffect(()=> {
        if(coinData) {
            setCoinList(coinData)
        }
    },[coinData])

    return {
        addMutation: addMutation,
        updateMutation: updateMutation,
        user: user,
    }
}