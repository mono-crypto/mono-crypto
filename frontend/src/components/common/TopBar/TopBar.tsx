import React from 'react'

import Login from '@/components/Login/'

import * as S from './styles'

function TopBar() {
    return (
        <S.Header>
            <a href="/">MonoCrypto</a>
            <S.Login>
                <Login/>
            </S.Login>
        </S.Header>
    )
}

export default TopBar