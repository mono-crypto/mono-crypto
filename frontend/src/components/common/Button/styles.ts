import styled from 'styled-components'
import { CommonButtonInterface } from '../Button/Button'


export const Button = styled.button<CommonButtonInterface>`
    display: inline-block;
    width: 100%;
    border: 1px solid #666;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
        border-color: #999;
        ${props => props.hoverCSS}
    }
    &:focus {
        border-color: #409eff;
    }
    &:active {
        background-color: #409eff;
    }

    ${props => props.css}
`