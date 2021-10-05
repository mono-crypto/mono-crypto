import styled from 'styled-components'

export const WalletSummary = styled.div`
  margin: 16px 16px;
`

export const Title = styled.h2`
  font-weight: bold;
  font-size: 14px;
`

export const MainTotal = styled.div`
  margin-top: 5px;
  font-weight: bold;
  font-size: 28px;
`

export const SubTotal = styled.div`
  margin-top: 5px;
  color: #999;
  font-size: 12px;
`

export const RevenueContent = styled.dl`
  display: grid;
  grid-row-gap: 6px;
  grid-column-gap: 5px;
  grid-template-columns: 120px 1fr;
  margin-top: 15px;
  font-size: 14px;
`

export const RevenueContentTitle = styled.dt`
  color: #333;
`

export const RevenueContentDescription = styled.dd`
  color: ${props => props.color};
  text-align: right;
`
