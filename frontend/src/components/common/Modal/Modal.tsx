import React from 'react'

import * as S from './styles'

import Button from '@/components/common/Button'

type ModalProps = {
    children: React.ReactNode
    changeDialogState: () => void
    visible: boolean
}

function Modal({children, changeDialogState, visible}:ModalProps) {
    if(!visible) return null
    return(
        <S.Dimm>
            <S.Wrapper>
                <div className="content">
                    {children}
                </div>
                <div className="buttons">
                    <div className="flex">
                        {visible}
                        <Button onClick={changeDialogState}>취소</Button>
                        <Button>확인</Button>
                    </div>
                </div>
            </S.Wrapper>
        </S.Dimm>
    )
}

export default Modal