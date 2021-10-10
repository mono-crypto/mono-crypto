import React from 'react'
import { Interpolation } from "styled-components";

import * as S from './styles'

interface CommonInputInterface extends React.InputHTMLAttributes<HTMLInputElement>{
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void,
    css?: Interpolation<React.CSSProperties>
}

function Input({ onChange, ...rest }: CommonInputInterface) {

    return (
        <S.Input
            onChange={onChange}
            {...rest}
        />
    )
}

export default Input