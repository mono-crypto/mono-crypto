import React from 'react'

import * as S from './styles'

interface WalletItemProps {
    data: string
    key: number
}

export default function CoinListItem(props:WalletItemProps) {
    return(
        <S.CoinListItem>
            <S.Title>
                {props.data}
            </S.Title>
            <S.Button>
                추가하기
            </S.Button>
        </S.CoinListItem>
    )
}