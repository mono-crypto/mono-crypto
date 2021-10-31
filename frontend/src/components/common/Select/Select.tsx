import React from 'react'

import * as S from './styles'

import { Interpolation } from 'styled-components'


interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    css?: Interpolation<React.CSSProperties>,
    options?: string[]
}

function Select({ options, ...rest }: SelectProps) {
    return(
        <S.Select {...rest}>
            <option value="" key={0}>-------</option>
            {options !== undefined ? options.map((item) => 
                <option value={item} key={item}>{item}</option>
            ) : null}
        </S.Select>
    )
}

export default Select