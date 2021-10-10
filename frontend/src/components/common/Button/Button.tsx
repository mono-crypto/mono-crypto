import React from 'react'
import { Interpolation } from "styled-components";

import * as S from './styles'

interface CommonButtonInterface extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: string
    onClick?: () => void
    css?: Interpolation<React.CSSProperties>
}

function Button({children, onClick, ...rest}: CommonButtonInterface) {
    return (
        <S.Button type="button" onClick={onClick} {...rest}>{children}</S.Button>
    )
}

export default Button