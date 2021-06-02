import React from 'react'

import * as S from './styles'

interface LabelInner {
    children: React.ReactNode
}

function Label({children}: LabelInner) {
    return(
        <S.Label>
            {children}
        </S.Label>
    )
}

export default Label