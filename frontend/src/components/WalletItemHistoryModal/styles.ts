import styled from 'styled-components'

export const LabelWrap = styled.div`
    & ~ & {
        margin-top: 0.7rem
    }
`

export const ListItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const ListItemButtonWrap = styled.div`
    display: flex;
`