import React from 'react'

import * as S from './styles'

interface CommonInputInterface {
    type: string
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void
    name?: string
    value?: any
    readOnly?: boolean
    disabled?: boolean
}

function Input({ ...props }: CommonInputInterface) {

    return (
        <S.Input
            type={props.type}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            readOnly={(props.readOnly === true)}
            disabled={(props.disabled === true)}
        />
    )
}

export default Input