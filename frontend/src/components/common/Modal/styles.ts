import styled from 'styled-components'

export const Dimm = styled.div`
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
`

export const Wrapper = styled.div`
    position: absolute;
    display: inline-block;
    width: ${props => props.modalWidth || '100%'};
    max-width: ${props => props.maxWidth || '70%'};
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 30px;
    background-color: white;
    border: #333 solid 1px;
    border-radius: 9px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
`