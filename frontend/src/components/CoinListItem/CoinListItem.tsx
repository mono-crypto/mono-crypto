import React from 'react'

import * as S from './styles'

import { useAddCoinModalStateSelector } from '@/atoms/addCoinDialog'

import { CoinListItem as TCoinListItem } from '@/lib/api/types'

interface WalletItemProps {
    data: TCoinListItem
    key: number
}

export default function CoinListItem(props:WalletItemProps) {
    const [dialogState, setDialogState] = useAddCoinModalStateSelector();
    const openDialog = () => {
        setDialogState({
            ...dialogState,
            ticker: props.data.name,
            visible: true
        })
        console.log('open dialog state: ', dialogState)

    }

    return(
        <S.CoinListItem>
            <S.Title>
                {props.data.name}
            </S.Title>
            <S.Button onClick={openDialog}>
                추가하기
            </S.Button>
        </S.CoinListItem>
    )
}