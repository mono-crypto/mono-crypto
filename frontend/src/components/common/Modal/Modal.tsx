import React from 'react'

import * as S from './styles'

import Button from '@/components/common/Button'
import Loading from '@/components/common/Loading'
import { Interpolation } from 'styled-components'

type ModalProps = {
    children: React.ReactNode
    changeDialogState: () => void
    visible: boolean
    hasBottomBtn: boolean
    hasCloseButton?: boolean
    modalConfirmAction?: () => void
    hasTitle?: string
    btnLoading?: boolean
    buttonCSS?: Interpolation<React.CSSProperties>
    width?: string
    maxWidth?: string
    loadingCSS?: Interpolation<React.CSSProperties>
}

function Modal({...props}:ModalProps) {
    console.log('Modal')
    return(
        <S.Dimm visible={props.visible}>
            <S.Wrapper visible={props.visible} width={props.width} maxWidth={props.maxWidth}>
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
                {
                    props.hasCloseButton &&
                    <S.CloseButton onClick={props.changeDialogState}>close</S.CloseButton>
                }
                {
                    props.btnLoading &&
                    <Loading loadingCSS={props.loadingCSS}/>
                }
            </S.Wrapper>
        </S.Dimm>
    )
}

export default Modal