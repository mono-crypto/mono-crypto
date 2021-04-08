import React from 'react'

import * as S from './styles'

import { IWalletItem } from '@/pages/Wallet'


interface WalletItemProps {
    data: IWalletItem;
}
function WalletItem({data}:WalletItemProps) {
    return(
        <S.WalletItem>
            <S.Header>
                <S.Title>
                    {/* 보유 코인종목 */}
                    {data.name}
                    <S.TitleTrans>
                        {data.nameKr}
                    </S.TitleTrans>
                </S.Title>
                <S.Reserve>
                    {/* 현재 보유량 */}
                    {data.reserve}
                </S.Reserve>
            </S.Header>
            <S.Content>
                <S.EvaluationAmount>
                    {/* 평가금액 */}
                    {data.won}
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