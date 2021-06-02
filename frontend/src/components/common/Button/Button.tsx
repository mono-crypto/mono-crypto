import React from 'react'

import * as S from './styles'

interface CommonButtonInterface {
    children: string
    onClick?: () => void
}

function Button({children, onClick}: CommonButtonInterface) {
    return (
        <S.Button type="button" onClick={onClick}>{children}</S.Button>
    )
}

export default Button