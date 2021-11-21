import React from 'react'

import WalletRealTime from '@/components/WalletRealTime'
import WalletChart from '@/components/WalletChart'
import CoinListItemGroup from '@/components/CoinListItemGroup'
import WalletItemHistoryModal from '@/components/WalletItemHistoryModal'
import CoinListModal from '@/components/CoinListModal'

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
      <WalletItemHistoryModal />
      <CoinListModal />
    </WalletWrap>
  )
}

export default Wallet
