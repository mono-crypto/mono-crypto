import React from 'react'

import * as S from './styles'

import { WalletItem as TWalletItem } from '@/lib/api/types'


interface WalletItemProps {
    data: TWalletItem;
}

function WalletItem({data}:WalletItemProps) {
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
                <S.Reserve>
                    {/* 현재 보유량 */}
                    {data.ea}
                </S.Reserve>
            </S.Header>
            <S.Content>
                <S.EvaluationAmount>
                    {/* 평가금액 */}
                    {data.avgPrice}
                </S.EvaluationAmount>
                <S.Yield>
                    {/* 수익률 */}
                    -0.20(-20%)
                </S.Yield>
            </S.Content>
        </S.WalletItem>
    )
}

export default WalletItem