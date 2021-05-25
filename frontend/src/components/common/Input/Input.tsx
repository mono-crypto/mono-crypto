import React from 'react'

import * as S from './styles'

function Input({ ...props }) {
    const { type } = props

    return (
        <S.Input type={type}/>
    )
}

export default Input