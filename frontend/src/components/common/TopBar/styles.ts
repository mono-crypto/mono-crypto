import styled from 'styled-components'

export const Header = styled.header`
    position: fixed;
    top: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 3.5rem;
    background-color: white;
    box-shadow: 0 0 12px rgb(0 0 0 / 10%);
`

export const Login = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-right: 1rem;
`