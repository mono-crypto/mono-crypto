import React from 'react'
import { Interpolation } from 'styled-components'

import * as S from './styles'

export interface LoadingProps extends React.ButtonHTMLAttributes<HTMLDivElement>{
    loadingCSS: Interpolation<React.CSSProperties>
}

const css = {
    width: '2rem',
    height: '2rem'
}

function Loading({...props}:LoadingProps) {
    console.log('Loading')
    return(
        <S.LoadingWrap>
            <S.CircleWrap {...props}/>
        </S.LoadingWrap>
    )
}

export default Loading