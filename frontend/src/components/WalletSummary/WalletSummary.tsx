import React from 'react'
import * as S from './styles'

import { WalletItem as TWalletItem } from '@/lib/api/types'

interface WalletSummaryProps {
    data?: TWalletItem[]
}

function WalletSummary({...props}: WalletSummaryProps) {
  const summaryData = {
    convertPrice: 0
  };
  const data = props.data !== undefined ? props.data.reduce((result, cur) => {
    console.log(cur)
    result.convertPrice += parseInt(cur.convertPrice)
    return result
  }, summaryData) : null;

  return (
    <S.WalletSummary>
      <S.Title>총 보유자산</S.Title>
      <S.MainTotal>{summaryData.convertPrice.toLocaleString()}원</S.MainTotal>
      <S.SubTotal>≈ 0.5BTC</S.SubTotal>
      <S.RevenueContent>
        <S.RevenueContentTitle>평가손익</S.RevenueContentTitle>
        <S.RevenueContentDescription>-76,558원</S.RevenueContentDescription>
        <S.RevenueContentTitle>수익률</S.RevenueContentTitle>
        <S.RevenueContentDescription>-14,28%</S.RevenueContentDescription>
      </S.RevenueContent>
    </S.WalletSummary>
  )
}

export default WalletSummary
