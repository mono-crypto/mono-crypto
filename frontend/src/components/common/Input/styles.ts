import styled, { css } from 'styled-components'

export const Input = styled.input.attrs(props => ({
    type: props.type,
    name: props.name ? props.name : "test",
    readOnly: props.readOnly === true ? true : false,
    disabled: props.disabled === true ? true : false
}))`
    display: inline-block;
    width: 100%;
    border: 1px solid #666;
    border-radius: 4px;
    ${props =>
        props.huge &&
        css`
            padding: 10px;
            font-size: 16px;
    `}

    &:hover {
        border-color: #999;
    }
    &:focus {
        border-color: #409eff;
    }
    ${props => props.css}
`