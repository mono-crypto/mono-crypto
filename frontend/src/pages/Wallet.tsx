import React from 'react'

import WalletRealTime from '@/components/WalletRealTime'


import WalletChart from '@/components/WalletChart'

import CoinListItemGroup from '@/components/CoinListItemGroup'
import CoinListItem from '@/components/CoinListItem'

import useCoinListQuery from '@/hooks/query/useCoinListQuery'

import { CoinListItem as TCoinListItem, WalletItem as TWalletItem } from '@/lib/api/types'

import Input from '@/components/common/Input'
import { coinListFilterInput } from '@/atoms/coinListState'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import styled from 'styled-components'

const CoinListItemGroupDiv = styled.div`
  margin-top: 20px;
`;


function Wallet() {
  console.log("wallet rendering ...");
  const {isLoading:coinIsLoading, data:coinData, error:coinDataError} = useCoinListQuery();

  

  const mapToCoinListItem = (data: TCoinListItem[]) => {
    return data.filter( item => item.name.toLowerCase().includes(filterInput.toLowerCase())).map((data, index) => (<CoinListItem key={index} data={data.name} />))
  }

  const setListItemFilterInput = useSetRecoilState(coinListFilterInput)
  const filterInput = useRecoilValue(coinListFilterInput)

  const changeListItemFilterInput = (e: React.FormEvent<HTMLInputElement>) => {
    setListItemFilterInput(e.currentTarget.value);
  }

  return (
    <>
      <WalletChart />
      <WalletRealTime />
      <CoinListItemGroupDiv>
        <CoinListItemGroup>
          <Input type="text" onChange={changeListItemFilterInput}/>
          {coinIsLoading ? 'Loading....' : (coinDataError !== null ? 'error' : mapToCoinListItem(coinData))}
        </CoinListItemGroup>
      </CoinListItemGroupDiv>
    </>
  )
}

export default Wallet
