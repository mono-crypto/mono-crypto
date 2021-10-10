import React from 'react'

import * as S from './styles'

import Button from '@/components/common/Button'
import { Interpolation } from 'styled-components'

type ModalProps = {
    children: React.ReactNode
    changeDialogState: () => void
    modalConfirmAction: () => void
    visible: boolean
    hasBottomBtn: boolean
    hasTitle?: string
    btnLoading?: boolean
    buttonCSS?: Interpolation<React.CSSProperties>
}

function Modal({...props}:ModalProps) {
    if(!props.visible) return null
    return(
        <S.Dimm>
            <S.Wrapper>
                {
                    props.hasTitle &&
                    <S.Title>{props.hasTitle}</S.Title>
                }
                <S.Content>
                    {props.children}
                </S.Content>
                {
                    props.hasBottomBtn &&
                    <S.BottomButtons className={props.btnLoading? "true" : "false"}>
                        <Button onClick={props.changeDialogState} css={props.buttonCSS}>취소</Button>
                        <Button onClick={props.modalConfirmAction} css={props.buttonCSS}>확인</Button>
                    </S.BottomButtons>
                }
            </S.Wrapper>
        </S.Dimm>
    )
}

export default Modal