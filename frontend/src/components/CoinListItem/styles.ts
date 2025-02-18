import styled from 'styled-components'

export const CoinListItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    background-color: white;
    border: 1px solid rgb(236, 239, 241);
    border-radius: 8px;

    & + & {
        margin-top: 0.6rem;
    }
`

export const Title = styled.div`
    padding-left: 15px;
    font-weight: bold;
    font-size: 22px;
`