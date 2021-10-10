import React from 'react'

import * as S from './styles'

function TopBar() {
    return (
        <S.Header>
            <a href="/">MonoCrypto</a>
            <S.Login>Login Logo</S.Login>
        </S.Header>
    )
}

export default TopBar