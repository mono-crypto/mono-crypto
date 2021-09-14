import React from 'react'

import * as S from './styles'

import { WalletItem as TWalletItem } from '@/lib/api/types'


interface WalletItemProps {
    data: TWalletItem;
    valuationAmount: number;
}

interface IwallItemDataForJSX {
    name: String;
    data: number | String;
}

function WalletItem({data, valuationAmount}:WalletItemProps) {
    const contentData = [
        {
            name: '평가손익',
            data: ((data.ea * data.price) - Math.round(valuationAmount)).toLocaleString(),
        },
        {
            name: '수익률',
            data: ((Math.round(valuationAmount) / (data.ea * data.price)) * 100 - 100).toFixed(2) + ' %'
        }
    ]
    const detailData = [
        {
            name: '매수평균가',
            data: data.price.toLocaleString()+' 원',
        },
        {
            name: '평가금액',
            data: (valuationAmount ? Math.round(valuationAmount).toLocaleString() : '') + ' 원',
        },
        {
            name: '매수금액',
            data: (data.ea * data.price).toLocaleString() + ' 원',
        },
        {
            name: '보유수량',
            data: data.ea + ' ' + data.ticker,
        }
    ]

    const contentDataJSX = (contentDataArray: IwallItemDataForJSX[]) => {
        return contentDataArray.map((item, index) => {
            return <S.contentDescription key={index}>
                <span>{item.name}</span>
                <S.testspan color={Number(item.data) > 0 ? 'red' : "#0e52cf"}>{item.data}</S.testspan>
            </S.contentDescription>
        })
    }

    const detailDataJSX = (detailDataArray: IwallItemDataForJSX[]) => {
        return detailDataArray.map((item, index) => {
            return <S.DetailDescription key={index}>
                <span>{item.name}</span>
                <span>{item.data}</span>
            </S.DetailDescription>
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
            </S.Header>
            <S.Content>
                {contentDataJSX(contentData)}
            </S.Content>
            <S.Detail>
                {detailDataJSX(detailData)}
            </S.Detail>
        </S.WalletItem>
    )
}

export default WalletItem