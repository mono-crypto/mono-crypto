import React from 'react'

import * as S from './styles'

function WalletItem() {
    return(
        <S.WalletItem>
            <S.Header>
                <S.Title>
                    {/* 보유 코인종목 */}
                    BTC
                    <S.TitleTrans>
                        비트코인
                    </S.TitleTrans>
                </S.Title>
                <S.Reserve>
                    {/* 현재 보유량 */}
                    0.00001
                </S.Reserve>
            </S.Header>
            <S.Content>
                <S.EvaluationAmount>
                    {/* 평가금액 */}
                    9,550원
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