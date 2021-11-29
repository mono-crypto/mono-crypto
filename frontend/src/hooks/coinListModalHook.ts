import { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { authState } from '@/atoms/authState'
import { useMutation, useQueryClient } from 'react-query'
import { addWalletList as AaddWalletItem } from '@/lib/api/wallet/addWalletList'
import { addWalletItem as TaddWalletItem } from '@/lib/api/types'
import { updateWalletItem as AupdateWalletItem } from '@/lib/api/wallet/updateWalletItem'
import { updateWalletItem as TupdateWalletItem } from '@/lib/api/types'
import { useConinList } from '@/atoms/coinListState'

import useCoinListQuery from '@/hooks/query/useCoinListQuery'

import { useAddCoinModalVisibleState, useAddCoinModalLoadingState, useAddCoinModalStateSelector, useCoinMarketList } from '@/atoms/addCoinDialog'

export function coinListModalHook() {
    const queryClient = useQueryClient() 
    
    const [user] = useRecoilState(authState)
    const [, setCoinList] = useConinList()
    const [dialogValue, setDialogValue] = useAddCoinModalStateSelector()
    const [, setDialogLoadingState] = useAddCoinModalLoadingState()
    const [dialogVisibleState, setDialogVisibleState] = useAddCoinModalVisibleState()
    const coinMarketList = useCoinMarketList();

    const {isLoading:coinIsLoading, data:coinData, error:coinDataError} = useCoinListQuery();

    const addMutation = useMutation((addWalletItemData:TaddWalletItem) => (AaddWalletItem(addWalletItemData)), {
        onMutate: (params) => {
            setDialogLoadingState(true);
        },
        onSuccess: (data, params) => {
            queryClient.invalidateQueries('walletList')
            queryClient.invalidateQueries(['walletItemHistory', params.ticker])
        },
        onSettled: (data, error, params, context) => {
            setDialogLoadingState(false);
            setDialogVisibleState(!dialogVisibleState)
        }
    })

    const updateMutation = useMutation((addWalletItemData:TupdateWalletItem) => (AupdateWalletItem(addWalletItemData)), {
        onMutate: (params) => {
            setDialogLoadingState(true);
        },
        onSuccess: (data, params) => {
            queryClient.invalidateQueries('walletList')
            queryClient.invalidateQueries(['walletItemHistory', params.ticker])
        },
        onSettled: (data, error, params, context) => {
            setDialogLoadingState(false);
            setDialogVisibleState(!dialogVisibleState)
        }
    })

    const confirmAction = useCallback(async() => {
        try {
            if(dialogValue._id) {
                await updateMutation.mutate({
                    _id: dialogValue._id,
                    ticker: dialogValue.ticker,
                    market: dialogValue.market,
                    price: dialogValue.price,
                    ea: dialogValue.ea,
                    date: dialogValue.date,
                    access_token: user?.access_token
                })
            } else {
                await addMutation.mutate({
                    ticker: dialogValue.ticker,
                    market: dialogValue.market,
                    price: dialogValue.price,
                    ea: dialogValue.ea,
                    date: dialogValue.date,
                    access_token: user?.access_token
                })
            }
        } catch(e) {
            console.log(e);
        }
    }, [dialogValue, user])

    const changeDialogState = useCallback(() => {
        setDialogVisibleState(!dialogVisibleState)
    }, [dialogVisibleState])

    useEffect(()=> {
        if(coinData) {
            setCoinList(coinData)
        }
    },[coinData])

    return {
        addMutation: addMutation,
        updateMutation: updateMutation,
        user: user,
        dialogValue: dialogValue,
        dialogVisibleState: dialogVisibleState,
        coinMarketList: coinMarketList,
        setDialogValue: setDialogValue,
        setDialogLoadingState: setDialogLoadingState,
        setDialogVisibleState: setDialogVisibleState,
        confirmAction: confirmAction,
        changeDialogState: changeDialogState
    }
}