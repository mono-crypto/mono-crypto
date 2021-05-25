import React from 'react'

import * as S from './styles'

import { useRecoilState } from 'recoil'
import { addCoinDialogState } from '@/atoms/addCoinDialog'


interface WalletItemProps {
    data: string
    key: number
}

export default function CoinListItem(props:WalletItemProps) {
    const [coinDialogState, setCoinDialogState] = useRecoilState(addCoinDialogState);

    const changeDialogState = () => {
        setCoinDialogState(!coinDialogState)
    }

    return(
        <S.CoinListItem>
            <S.Title>
                {props.data}
            </S.Title>
            <S.Button onClick={changeDialogState}>
                추가하기
            </S.Button>
        </S.CoinListItem>
    )
}