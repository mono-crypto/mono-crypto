import React from 'react'

import * as S from './styles'

import Button from '@/components/common/Button'

type ModalProps = {
    children: React.ReactNode
    changeDialogState: () => void
    visible: boolean
    hasBottomBtn: boolean
}

function Modal({...props}:ModalProps) {
    if(!props.visible) return null
    return(
        <S.Dimm>
            <S.Wrapper>
                <S.Content>
                    {props.children}
                </S.Content>
                {
                    props.hasBottomBtn &&
                    <S.BottomButtons>
                        <Button onClick={props.changeDialogState}>취소</Button>
                        <Button>확인</Button>
                    </S.BottomButtons>
                }
            </S.Wrapper>
        </S.Dimm>
    )
}

export default Modal