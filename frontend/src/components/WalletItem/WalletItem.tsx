import React, { useState } from 'react'

import * as S from './styles'

import Button from '@/components/common/Button'
import { walletItemHook } from '@/hooks/walletItemHook'
import { useHistoryVisible } from '@/atoms/walletItemHistoryState'
import { getAuthState } from '@/atoms/authState'

interface WalletItemProps {
    data: any;
    btcToUSDPrice: number;
    exchangeInfo: number;
    itemPrice: number;
    deleteWalletItemFn?: () => void;
    updateWalletItemFn?: () => void;
}

interface IwallItemDataForJSX {
    name: String;
    data: number;
    format?: String | null;
    // ea: number;
    unit: String;
}

const ButtonCSS = {
    'padding': '0.5rem 0',
    'font-size': '1rem'
    // 'box-shadow': '0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)'
}

const ButtonHoverCSS = {
    'background-color': 'rgb(0 0 0 / 20%)'
}

function WalletItem({data, btcToUSDPrice, exchangeInfo, itemPrice}:WalletItemProps) {
    const [flipFalg, setFlipFlag] = useState(true);
    const { updateWalletDialogDisplay, setUpdateWalletDialogDisplay, setHistoryTicker, deleteWalletItemMutation } = walletItemHook();
    const [visible, setHistoryVisible] = useHistoryVisible();
    const user = getAuthState();

    const contentData = [
        {
            name: '평가손익',
            data: Number((itemPrice - data.convertPriceAvg)*data.ea.reduce((prev:number, cur:number) => prev+cur) * btcToUSDPrice * exchangeInfo),
            format: 'money',
            unit: '원'
        },
        {
            name: '수익률',
            data: (Number(itemPrice / data.convertPriceAvg) * 100 - 100).toFixed(2),
            unit: '%'
        }
    ]
    const detailData = [
        {
            name: '매수평균가',
            data: (btcToUSDPrice * (data.convertPriceAvg) * exchangeInfo),
            unit: '원'
        },
        {
            name: '평가금액',
            data: ((btcToUSDPrice * itemPrice) * data.ea.reduce((prev:number, cur:number) => prev+cur))*exchangeInfo,
            unit: '원'
        },
        {
            name: '매수금액',
            data: (btcToUSDPrice * (data.convertPriceAvg * data.ea.reduce((prev:number, cur:number) => prev+cur)) * exchangeInfo),
            unit: '원'
        },
        {
            name: '보유수량',
            data: data.ea.reduce((prev:number, cur:number) => prev+cur),
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
                }>{
                    isNaN(item.data) ? 0 : (item.format == 'money' ? Math.round(item.data).toLocaleString() : item.data)
                } {item.unit}</S.contentDescription>
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
                    { isNaN(item.data) ? 0 : Math.round(item.data).toLocaleString() } {item.unit}
                </S.DetailDescription>
            </React.Fragment>)
        })
    }

    const changeFlipFalg = () => {
        setFlipFlag(!flipFalg)
    }
    const getAssetHistory = () => {
        setHistoryTicker(data.ticker)
        setHistoryVisible(true)
    }

    const deleteWalletItem = () => {
        console.log('삭제')
        deleteWalletItemMutation.mutate({
            access_token: user?.access_token,
            ticker: data.ticker
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
                <S.filpTrigger onClick={changeFlipFalg} flip={flipFalg}/>
            </S.Header>
            <S.ContentWrap>
                <S.Content>
                    {contentDataJSX(contentData)}
                </S.Content>
                <S.Detail flip={flipFalg} >
                    {detailDataJSX(detailData)}
                </S.Detail>
            </S.ContentWrap>
            <S.EditButtons>
                <Button onClick={deleteWalletItem} css={ButtonCSS} hoverCSS={ButtonHoverCSS}>삭제</Button>
                <Button onClick={getAssetHistory} css={ButtonCSS} hoverCSS={ButtonHoverCSS}>내역보기</Button>
                {/* <Button onClick={deleteWalletItem} css={ButtonCSS} hoverCSS={ButtonHoverCSS}>삭제</Button>
                <Button onClick={changeDialogState} css={ButtonCSS} hoverCSS={ButtonHoverCSS}>수정</Button> */}
            </S.EditButtons>
        </S.WalletItem>
    )
}

export default WalletItem