import styled from 'styled-components'

export const Button = styled.button`
    display: inline-block;
    width: 100%;
    border: 1px solid #666;
    border-radius: 4px;

    &:hover {
        border-color: #999;
    }
    &:focus {
        border-color: #409eff;
    }
    &:active {
        background-color: #409eff;
    }

    ${props => props.css}
`