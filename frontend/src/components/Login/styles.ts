import styled, { CSSObject } from 'styled-components'
import { loginIcon } from '../../assets/img'
import { closeIcon } from '../../assets/img'

export interface ILoginIcon {
    width?: string;
    height?: string;
    borderRadius?: string;
    backgroundImage?: string;
}

export interface IUserInfo {
    width?: string;
    display?: number;
}

export const LoginIcon = styled.span<ILoginIcon>`
    display: inline-block;
    width: ${props => props.width};
    height: ${props => props.height};
    background-image: url(${props => props.backgroundImage ? props.backgroundImage : loginIcon});
    background-size: 100%;
    border-radius: ${props => props.borderRadius};
`

export const CustomButton = styled.button`
    border: 0;
`

export const UserInfo = styled.div<IUserInfo>`
    position: absolute;
    top: 3.8rem;
    right: 0.5rem;
    display: inline-block;
    width: ${props => props.width};
    padding: 3rem 1rem 1rem 1rem;
    text-align: center;
    background-color: white;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgb(0 0 0 / 20%);
    visibility: ${props => props.display ? 'visible' : 'hidden'};
    
    .title {
        img {
            width: 7rem;
            height: 7rem;
            margin: 0 auto;
            border-radius: 3.5rem;
        }

        &_info {
            margin-top: 1rem;
        }
    }

    .bottom {
        margin-top: 2rem;
    }

    .close {
        position: absolute;
        top: 0.7rem;
        right: 0.7rem;
        padding: 0.9rem;
        font-size: 0;
        background-image: url(${closeIcon});
        background-size: 100%;
        border: 0;
    }
`

