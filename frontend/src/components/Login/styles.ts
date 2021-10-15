import styled from 'styled-components'
import loginIcon from '../../assets/img/login-icon.svg'

export const LoginIcon = styled.span`
    display: inline-block;
    width: ${props => props.width};
    height: ${props => props.height};
    background-image: url(${loginIcon});
    background-size: 100%;
`

export const customButton = styled.button`
    border: 0;
`