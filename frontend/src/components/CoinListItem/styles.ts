import styled from 'styled-components'

export const CoinListItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    border: 1px solid #333;
    border-radius: 8px;

    & + & {
        margin-top: 4px;
    }
`

export const Title = styled.div`
    padding-left: 15px;
    font-weight: bold;
    font-size: 22px;
`

export const Button = styled.button`
    padding: 10px 20px;
    line-height: 1;
    border: 1px solid black;
    border-radius: 4px;
    appearance: none;
`