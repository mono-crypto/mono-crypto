import React from 'react'

import WalletRealTime from '@/components/WalletRealTime'


import WalletChart from '@/components/WalletChart'

import CoinListItemGroup from '@/components/CoinListItemGroup'
import CoinListItem from '@/components/CoinListItem'

import useCoinListQuery from '@/hooks/query/useCoinListQuery'

import { CoinListItem as TCoinListItem } from '@/lib/api/types'

import { coinListFilterInput } from '@/atoms/coinListState'
import { useRecoilValue } from 'recoil'

import styled from 'styled-components'

const CoinListItemGroupDiv = styled.div`
  margin-top: 20px;
`;
const WalletWrap = styled.div`
  margin-top: 3.5rem;
  padding: 10px;
`;

function Wallet() {
  console.log("wallet rendering ...");
  const {isLoading:coinIsLoading, data:coinData, error:coinDataError} = useCoinListQuery();
  const filterInput = useRecoilValue(coinListFilterInput)

  const mapToCoinListItem = (data: TCoinListItem[]) => {
    return data.filter( item => item.name.toLowerCase().includes(filterInput.toLowerCase())).map((data, index) => (<CoinListItem key={index} data={data.name} />))
  }


  return (
    <WalletWrap>
      <WalletChart/>
      <WalletRealTime />
      <CoinListItemGroupDiv>
        <CoinListItemGroup>
          {coinIsLoading ? 'Loading....' : (coinDataError !== null ? 'error' : mapToCoinListItem(coinData))}
        </CoinListItemGroup>
      </CoinListItemGroupDiv>
    </WalletWrap>
  )
}

export default Wallet
