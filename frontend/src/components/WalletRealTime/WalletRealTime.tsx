import React, { useRef, useMemo } from 'react'
import useWebSocket from 'react-use-websocket'

import WalletSummary from '@/components/WalletSummary'
import WalletItemGroup from '@/components/WalletItemGroup'
import WalletItem from '@/components/WalletItem'

import { useWalletListQuery } from '@/hooks/query/useWalletListQuery'

import { WalletItem as TWalletItem } from '@/lib/api/types'

import * as S from './styles'

export interface ICryptoMarketPrices {
    [key: string]: {
        binance: {
            price: number
        }
    }
}

function WalletRealTime() {
    const { lastMessage } = useWebSocket(
        'wss://stream.binance.com:9443/ws/btcusdt@miniTicker'
    )
    const cryptoMarketPrices = useRef<ICryptoMarketPrices>({})

    cryptoMarketPrices.current = useMemo(() => {
        if (lastMessage === null) return cryptoMarketPrices.current
        const data = JSON.parse(lastMessage.data)
        cryptoMarketPrices.current[data.s] = {
            binance: {
                price: data.c
            }
        }
        return cryptoMarketPrices.current
    }, [lastMessage])

    console.log(cryptoMarketPrices.current.BTCUSDT?.binance.price);

  const {isLoading:walletListLoading, data:walletListData, error:walletListError} = useWalletListQuery();

  const mapToWalletItem = (data: TWalletItem[]) => {
    return data.map((data, index) => 
      <WalletItem data={data} key={index} />
    )
  }

  return (
      <>
        <WalletSummary data={walletListData}/>
        <WalletItemGroup>
          {walletListLoading ? 'Loading....' : (walletListError !== null ? 'error' : mapToWalletItem(walletListData))}
        </WalletItemGroup>
      </>
  )
}

export default WalletRealTime
