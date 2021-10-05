import React, { useState } from 'react'

import * as S from './styles'

import { WalletItem as TWalletItem } from '@/lib/api/types'

import Button from '@/components/common/Button'
import { walletItemHook } from '@/hooks/walletItemHook'


interface WalletItemProps {
    data: TWalletItem;
    valuationAmount: number;
    deleteWalletItemFn?: () => void;
    updateWalletItemFn?: () => void;
}

interface IwallItemDataForJSX {
    name: String;
    data: number | String;
    format?: String | null;
    unit: String;
}

function WalletItem({data, valuationAmount}:WalletItemProps) {
    const [flipFalg, setFlipFlag] = useState(true);
    const { deleteWalletItemMutation, updateWalletDialogDisplay, setUpdateWalletDialogState, setUpdateWalletDialogDisplay } = walletItemHook();

    const contentData = [
        {
            name: '평가손익',
            data: Math.round(valuationAmount) - (data.ea * data.price),
            format: 'money',
            unit: '원'
        },
        {
            name: '수익률',
            data: ((Math.round(valuationAmount) / (data.ea * data.price)) * 100 - 100).toFixed(2),
            unit: '%'
        }
    ]
    const detailData = [
        {
            name: '매수평균가',
            data: data.price.toLocaleString(),
            unit: '원'
        },
        {
            name: '평가금액',
            data: (valuationAmount ? Math.round(valuationAmount).toLocaleString() : ''),
            unit: '원'
        },
        {
            name: '매수금액',
            data: (data.ea * data.price).toLocaleString(),
            unit: '원'
        },
        {
            name: '보유수량',
            data: data.ea,
            unit: data.ticker
        }
    ]

    const contentDataJSX = (contentDataArray: IwallItemDataForJSX[]) => {
        return contentDataArray.map((item, index) => {
            return (<React.Fragment key={index}>
                <S.contentTitle>{item.name}</S.contentTitle>
                <S.contentDescription color={
                    Number(item.data) > 0
                    ? "red"
                    : (
                        Number(item.data) < 0 ?"#0e52cf" : undefined
                    )
                }>{item.format == 'money' ? item.data.toLocaleString() : item.data} {item.unit}</S.contentDescription>
            </React.Fragment>)
        })
    }

    const detailDataJSX = (detailDataArray: IwallItemDataForJSX[]) => {
        return detailDataArray.map((item, index) => {
            return (<React.Fragment key={index}>
                <S.DetailTitle>
                    {item.name}
                </S.DetailTitle>
                <S.DetailDescription>
                    {item.data} {item.unit}
                </S.DetailDescription>
            </React.Fragment>)
        })
    }

    const changeFlipFalg = () => {
        setFlipFlag(!flipFalg)
    }
    const deleteWalletItem = () => {
        deleteWalletItemMutation.mutate(data._id)
        // 업데이트 필요
    }

    const changeDialogState = () => {
        const date = new Date(data.date);
        setUpdateWalletDialogState({
            '_id': data._id,
            'ticker': data.ticker.toUpperCase(),
            'market': data.market.toUpperCase(),
            'price' : data.price,
            'ea' : data.ea,
            'date': date.getFullYear().toString() + ((date.getMonth()+1).toString().length < 2 ? '0'+(date.getMonth()+1).toString() : (date.getMonth()+1).toString()) + ((date.getDate()).toString().length < 2 ? '0'+(date.getDate()).toString() : (date.getDate()).toString()),
        })
        setUpdateWalletDialogDisplay({
            'state': !updateWalletDialogDisplay.state
        })
    }

    return(
        <S.WalletItem>
            <S.Header>
                <S.Title>
                    {/* 보유 코인종목 */}
                    {data.ticker}
                    <S.TitleTrans>
                        {data.ticker}
                    </S.TitleTrans>
                </S.Title>
                <S.filpTrigger onClick={changeFlipFalg} flipFlag={flipFalg}/>
            </S.Header>
            <S.Content>
                {contentDataJSX(contentData)}
            </S.Content>
            <S.Detail detailFlip={flipFalg} >
                {detailDataJSX(detailData)}
                <S.EditButtons>
                    <Button onClick={deleteWalletItem}>삭제</Button>
                    <Button onClick={changeDialogState}>수정</Button>
                </S.EditButtons>
            </S.Detail>
        </S.WalletItem>
    )
}

export default WalletItem