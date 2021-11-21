import React from 'react'

import * as S from './styles'

import { useResetAddCoinModalState, useAddCoinModalTickerState, useAddCoinModalVisibleState } from '@/atoms/addCoinDialog'

import { CoinListItem as TCoinListItem } from '@/lib/api/types'
import Button from '@/components/common/Button'

interface WalletItemProps {
    data: TCoinListItem
    key: number
}

const ButtonCSS = {
    'line-height': '1',
    'width': '6rem',
    'padding': '0.6rem 0.5rem 0.5rem 0.5rem',
    'font-size': '1rem'
    // 'box-shadow': '0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)'
}

const ButtonHoverCSS = {
    'background-color': 'rgb(0 0 0 / 20%)'
}

export default function CoinListItem(props:WalletItemProps) {
    const [, setDialogTicker] = useAddCoinModalTickerState();
    const [, setDialogVisible] = useAddCoinModalVisibleState();
    const resetDialog = useResetAddCoinModalState();
    const openDialog = () => {
        resetDialog()
        setDialogVisible(true)
        setDialogTicker(props.data.name)
    }

    return(
        <S.CoinListItem>
            <S.Title>
                {props.data.name}
            </S.Title>
            <Button onClick={openDialog} css={ButtonCSS} hoverCSS={ButtonHoverCSS}>
                추가
            </Button>
        </S.CoinListItem>
    )
}