import React from 'react'

import WalletSummary from '@/components/WalletSummary'
import WalletItem from '@/components/WalletItem'
import WalletChart from '@/components/WalletChart'

function Wallet() {
  return (
    <>
      <WalletSummary />
      <WalletChart />
      <WalletItem />
    </>
  )
}

export default Wallet
