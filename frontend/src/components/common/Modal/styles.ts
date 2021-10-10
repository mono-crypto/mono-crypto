import styled from 'styled-components'

export const Dimm = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    display: inline-block;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
`

export const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    display: inline-block;
    width: '100%';
    max-width: '70%';
    padding: 20px 30px;
    background-color: white;
    border: #333 solid 1px;
    border-radius: 9px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    transform: translate(-50%, -50%);
`

export const Content = styled.div`
    display: inline-block;    
`

export const BottomButtons = styled.div`
    display: flex;
    margin-top: 20px;

    button ~ button {
        margin-left: 1rem;
    }
`

export const Title = styled.div`
    display: block;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 20px;
`