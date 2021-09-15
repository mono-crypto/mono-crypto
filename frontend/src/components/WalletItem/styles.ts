import styled from 'styled-components'

export const WalletItem = styled.div`
    padding: 15px;
    border: 1px solid #333;
    border-radius: 8px;
    user-select: none;

    & + & {
        margin-top: 4px;
    }
`
export const Header = styled.div`
    position: relative;
    font-size: 16px;
`
export const Content = styled.dl`
  display: grid;
  grid-row-gap: 6px;
  grid-column-gap: 5px;
  grid-template-columns: 120px 1fr;
  margin-top: 15px;
  font-size: 14px;
`
export const Title = styled.div`
    padding-left: 15px;
    font-weight: bold;
    font-size: 22px;
`
export const TitleTrans = styled.span`
    margin-left: 10px;
    color: #888;
    font-weight: normal;
    font-size: 12px;
    vertical-align: middle;
`
export const filpTrigger = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #333;
    transform: rotate(45deg);

    &::after {
        position: absolute;
        top: ${props => props.flipFlag ? -1 : 2}px;
        left: ${props => props.flipFlag ? -1 : 2}px;
        display: inline-block;
        width: 90%;
        height: 90%;
        background-color: #fff;
        transition-timing-function: ease-in-out;
        transition-duration: 0.1s, 0s;
        transition-property: top, left;
        content: '';
    }
`
export const contentTitle = styled.dt`
  color: #888;
`
export const contentDescription = styled.dd`
  color: ${props => props.color};
  text-align: right;
`
export const Detail = styled.dl`
  display: ${props => props.detailFlip ? 'none' : 'grid'};
  grid-row-gap: 6px;
  grid-column-gap: 5px;
  grid-template-columns: 120px 1fr;
  margin-top: 15px;
  font-size: 14px;
`
export const DetailTitle = styled.dt`
  color: #888;
`
export const DetailDescription = styled.dd`
  text-align: right;
`
export const EditButtons = styled.div`
  display: flex
`