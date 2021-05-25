import React from 'react'

import * as S from './styles'

interface ModalInner {
    children: React.ReactNode
}

function Modal({children}: ModalInner) {
    
    return(
        <S.Dimm>
            <S.Wrapper>
                {children}
            </S.Wrapper>
        </S.Dimm>
    )
}

export default Modal