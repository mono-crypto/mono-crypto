import styled from 'styled-components'

export const Input = styled.input`
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
`