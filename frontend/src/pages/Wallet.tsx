import React, { useState, useRef, useMemo } from 'react'
import useWebSocket from 'react-use-websocket'

import WalletSummary from '@/components/WalletSummary'
import WalletItem from '@/components/WalletItem'
import WalletItemGroup from '@/components/WalletItemGroup'
import WalletChart from '@/components/WalletChart'

export interface IWalletItem {
  name: string
  nameKr: string
  won: number
  current: number
  reserve: number
}

export interface ICryptoMarketPrices {
  [key: string]: {
    binance: {
      price: number
    }
  }
}

function Wallet() {
  const { lastMessage } = useWebSocket(
    'wss://stream.binance.com:9443/ws/busdusdt@miniTicker/ognbnb@miniTicker/ognbtc@miniTicker/btcusdt@miniTicker'
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

  const [wallItemData] = useState<IWalletItem[]>([
    {
      name: 'BTC',
      nameKr: '비트코인',
      // 보유한 코인의 평가금액
      won: 9500,
      // 현재 코인시세
      current: 5000,
      // 보유량
      reserve: 0.000001
    },
    {
      name: 'ADA',
      nameKr: '에이다',
      won: 1500,
      current: 5000,
      reserve: 0.000001
    },
    {
      name: 'OGN',
      nameKr: '오리진 프로토콜',
      won: 1500,
      current: 5000,
      reserve: 0.000001
    }
  ])

  const mapToWalletItem = (data: IWalletItem[]) => {
    return data.map((data, index) => {
      return <WalletItem data={data} key={index} />
    })
  }
  return (
    <>
      <WalletSummary />
      <WalletChart />
      <WalletItemGroup>{mapToWalletItem(wallItemData)}</WalletItemGroup>
    </>
  )
}

export default Wallet
