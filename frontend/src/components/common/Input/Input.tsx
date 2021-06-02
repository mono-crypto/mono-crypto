import React from 'react'

import * as S from './styles'

interface CommonInputInterface {
    type: string
    onChange?: () => void
}

function Input({ ...props }: CommonInputInterface) {

    return (
        <S.Input type={props.type} onChange={props.onChange}/>
    )
}

export default Input