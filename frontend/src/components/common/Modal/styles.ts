import styled, { keyframes } from 'styled-components'
import { closeIcon } from '@/assets/img'

interface WrapperProps {
    width?: string
    maxWidth?: string
    visible?: boolean 
}

interface DimmedProps {
    visible?: boolean
}

export const Dimm = styled.div<DimmedProps>`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    display: inline-block;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    visibility: ${props => props.visible ? 'visible' : 'hidden' };
`

export const Wrapper = styled.div<WrapperProps>`
    position: absolute;
    top: 50%;
    left: 50%;
    display: inline-block;
    width: ${props => props.width ? props.width : '100%'};
    max-width: ${props => props.maxWidth ? props.maxWidth : '50%'};
    padding: 20px 30px;
    background-color: white;
    border: #333 solid 1px;
    border-radius: 9px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    transform: translate(-50%, -50%) ${props => props.visible ? '' : 'scale(0.2)'};
    transition: transform 250ms cubic-bezier(0.060, 0.840, 0.275, 0.955);
`

export const Content = styled.div`
    display: inline-block;
    width: 100%;
    max-height: 60vh;
    overflow: scroll;

    & > div + div {
        margin-top: 1.5rem;
    }
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


export const CloseButton = styled.div`
    position: absolute;
    top: 0.7rem;
    right: 0.7rem;
    padding: 0.9rem;
    font-size: 0;
    background-image: url(${closeIcon});
    background-size: 100%;
    border: 0;
`
