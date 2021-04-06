import React from 'react'
import * as S from './styles'

function WalletSummary() {
  return (
    <S.WalletSummary>
      <S.Title>총 보유자산</S.Title>
      <S.MainTotal>40,000,000원</S.MainTotal>
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
