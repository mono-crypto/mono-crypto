import React from 'react'
import * as S from './styles'

import { WalletItem as TWalletItem } from '@/lib/api/types'
import { ICryptoMarketPrices } from '@/components/WalletRealTime/WalletRealTime';

interface WalletSummaryProps {
    data?: TWalletItem[],
    exchangeInfo: string,
    cryptoMarketPrices: React.MutableRefObject<ICryptoMarketPrices>
}

function WalletSummary({...props}: WalletSummaryProps) {
  const summaryData = {
    convertPrice: 0,
    totalPurchaseAmount: 0
  };
  
  const data = props.data !== undefined ? props.data.reduce((result, cur) => {
    result.convertPrice += (props.cryptoMarketPrices.current[(cur.ticker+cur.market).toUpperCase()]?.binance.price * cur.ea)
    result.totalPurchaseAmount += (cur.ea*cur.price)
    return result
  }, summaryData) : null;

  return (
    <S.WalletSummary>
      <S.Title>총 보유자산</S.Title>
      <S.MainTotal>{(Math.round(summaryData.convertPrice * parseInt(props.exchangeInfo))).toLocaleString()}원</S.MainTotal>
      <S.SubTotal>≈ {props.exchangeInfo ? (summaryData.convertPrice / Math.round(parseInt(props.exchangeInfo) * props.cryptoMarketPrices.current['BTCUSDT']?.binance.price)).toFixed(8) : ""} BTC</S.SubTotal>
      <S.RevenueContent>
        <S.RevenueContentTitle>평가손익</S.RevenueContentTitle>
        <S.RevenueContentDescription color={
          Number(Math.round(summaryData.convertPrice * parseInt(props.exchangeInfo)) - summaryData.totalPurchaseAmount) > 0
          ? "red"
          : (
              Number(Math.round(summaryData.convertPrice * parseInt(props.exchangeInfo)) - summaryData.totalPurchaseAmount) < 0 ?"#0e52cf" : undefined
          )
        }>
          {Number.isNaN(Math.round(summaryData.convertPrice * parseInt(props.exchangeInfo)) - summaryData.totalPurchaseAmount) === false && (Math.round(summaryData.convertPrice * parseInt(props.exchangeInfo)) - summaryData.totalPurchaseAmount).toLocaleString()} 원
        </S.RevenueContentDescription>
        <S.RevenueContentTitle>수익률</S.RevenueContentTitle>
        <S.RevenueContentDescription color={
          Number(Math.round(summaryData.convertPrice * parseInt(props.exchangeInfo)) - summaryData.totalPurchaseAmount) > 0
          ? "red"
          : (
              Number(Math.round(summaryData.convertPrice * parseInt(props.exchangeInfo)) - summaryData.totalPurchaseAmount) < 0 ?"#0e52cf" : undefined
          )
        }>
          {((Math.round(summaryData.convertPrice * parseInt(props.exchangeInfo)) / summaryData.totalPurchaseAmount) * 100 - 100).toFixed(2)} %
        </S.RevenueContentDescription>
      </S.RevenueContent>
    </S.WalletSummary>
  )
}

export default WalletSummary
