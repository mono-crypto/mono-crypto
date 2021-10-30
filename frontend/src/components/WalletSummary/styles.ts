import styled from 'styled-components'

export const WalletSummary = styled.div`
  margin: 1rem;
`

export const Title = styled.h2`
  font-weight: bold;
  font-size: 0.8rem;
`

export const MainTotal = styled.div`
  margin-top: 0.3rem;
  font-weight: bold;
  font-size: 1.8rem;
`

export const SubTotal = styled.div`
  margin-top: 0.3rem;
  color: #999;
  font-size: 0.8rem;
`

export const RevenueContent = styled.dl`
  display: grid;
  grid-row-gap: 0.4rem;
  grid-column-gap: 0.4rem;
  grid-template-columns: 5.3rem 1fr;
  margin-top: 1rem;
  font-size: 1rem;
`

export const RevenueContentTitle = styled.dt`
  color: #333;
`

export const RevenueContentDescription = styled.dd`
  color: ${props => props.color};
  text-align: right;
`
