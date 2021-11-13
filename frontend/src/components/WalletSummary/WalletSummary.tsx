import React, { useEffect, useState } from 'react'
import * as S from './styles'

export interface ISummaryData {
  valuationLoss: number,
  yieldValue: number | string,
}

interface IwalletData {
  walletDataArray: Array<ISummaryData>,
  totalHoldings: number,
  btcToUSDPrice: number,
  exchangeInfo: string
}

interface WalletSummaryProps {
  summaryData: IwalletData,
}

function WalletSummary({summaryData}: WalletSummaryProps) {
  const [totalHoldings, setTotalHoldings] = useState<number>(0);
  const [valuationLoss, setValuationLoss] = useState<number>(0);

  const valuationAcc = () => {
    const initial = 0
    return summaryData.walletDataArray.reduce((prev, cur) => {
      return prev + cur.valuationLoss
    }, initial)
  }

  useEffect(()=>{
    if(summaryData) {
      const value = valuationAcc()
      setValuationLoss(value)
      setTotalHoldings(summaryData.totalHoldings * Number(summaryData.exchangeInfo))
    }
  }, [summaryData])

  return (
    <S.WalletSummary>
      <S.Title>총 보유자산</S.Title>
      <S.MainTotal>{isNaN(totalHoldings) ? 0 : Math.round(totalHoldings).toLocaleString()} 원</S.MainTotal>
      <S.SubTotal>≈ {isNaN(summaryData.totalHoldings / summaryData.btcToUSDPrice) ? 0 : (summaryData.totalHoldings / summaryData.btcToUSDPrice).toFixed(8)} BTC</S.SubTotal>
      <S.RevenueContent>
        <S.RevenueContentTitle>평가손익</S.RevenueContentTitle>
        <S.RevenueContentDescription color={
          Math.round(valuationLoss) > 0
          ? "red"
          : (
            Math.round(valuationLoss) < 0 ?"#0e52cf" : undefined
          )
        }>
          {Math.round(valuationLoss).toLocaleString()} 원
        </S.RevenueContentDescription>
        <S.RevenueContentTitle>수익률</S.RevenueContentTitle>
        <S.RevenueContentDescription color={
          (totalHoldings / (totalHoldings - valuationLoss)) * 100 - 100 > 0
          ? "red"
          : (
            (totalHoldings / (totalHoldings - valuationLoss)) * 100 - 100 < 0 ?"#0e52cf" : undefined
          )
        }>
          {isNaN((totalHoldings / (totalHoldings - valuationLoss)) * 100 - 100) ? 0 : ((totalHoldings / (totalHoldings - valuationLoss)) * 100 - 100).toFixed(2)} %
        </S.RevenueContentDescription>
      </S.RevenueContent>
    </S.WalletSummary>
  )
}

export default WalletSummary
