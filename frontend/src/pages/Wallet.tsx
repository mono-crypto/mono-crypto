import React from 'react'

import WalletRealTime from '@/components/WalletRealTime'

import WalletChart from '@/components/WalletChart'

import CoinListItemGroup from '@/components/CoinListItemGroup'

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

  return (
    <WalletWrap>
      <WalletChart/>
      <WalletRealTime />
      <CoinListItemGroupDiv>
        <CoinListItemGroup />
      </CoinListItemGroupDiv>
    </WalletWrap>
  )
}

export default Wallet
