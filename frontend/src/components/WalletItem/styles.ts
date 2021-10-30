import styled from 'styled-components'

interface flipTriggerProps {
  flip: boolean
}

interface detailProps {
  flip: boolean
}

export const WalletItem = styled.div`
    padding: 1rem;
    border-radius: 6px;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    user-select: none;

    & + & {
        margin-top: 0.5rem;
    }
`
export const Header = styled.div`
    position: relative;
    font-size: 1rem;
`
export const Content = styled.dl`
  display: grid;
  grid-row-gap: 0.4rem;
  grid-column-gap: 0.4rem;
  grid-template-columns: 5.3rem 1fr;
  margin-top: 1rem;
  font-size: 1rem;
`
export const Title = styled.div`
    padding-left: 1rem;
    font-weight: bold;
    font-size: 1.5rem;
`
export const TitleTrans = styled.span`
    margin-left: 0.4rem;
    color: #888;
    font-weight: normal;
    font-size: 0.8rem;
    vertical-align: middle;
`
export const filpTrigger = styled.span<flipTriggerProps>`
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background-color: #333;
    transform: rotate(45deg);

    &::after {
        position: absolute;
        top: ${props => props.flip ? -2 : 4}px;
        left: ${props => props.flip ? -2 : 4}px;
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
export const Detail = styled.dl<detailProps>`
  display: ${props => props.flip ? 'none' : 'grid'};
  grid-row-gap: 0.4rem;
  grid-column-gap: 0.4rem;
  grid-template-columns: 5.3rem 1fr;
  margin-top: 1rem;
  font-size: 1rem;
`
export const DetailTitle = styled.dt`
  color: #888;
`
export const DetailDescription = styled.dd`
  text-align: right;
`
export const EditButtons = styled.div`
  display: flex;
  margin-top: 1.25rem;

  button ~ button {
    margin-left: 3rem;
  }
`
export const ContentWrap = styled.div`
    display: inline-block;
    width: 100%;
`