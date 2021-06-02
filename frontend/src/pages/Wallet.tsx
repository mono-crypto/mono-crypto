import React, { useState, useRef, useMemo } from 'react'
import useWebSocket from 'react-use-websocket'

import WalletSummary from '@/components/WalletSummary'

import WalletItem from '@/components/WalletItem'
import WalletItemGroup from '@/components/WalletItemGroup'

import WalletChart from '@/components/WalletChart'

import CoinListItemGroup from '@/components/CoinListItemGroup'
import CoinListItem from '@/components/CoinListItem'

import ListItemFilter from '@/components/ListItemFilter'

import useCoinListQuery from '@/hooks/query/useCoinListQuery'

import { CoinListItem as TCoinListItem } from '@/lib/api/coin/types'

export interface IWalletItem {
  name: string,
  nameKr: string,
  avgPrice: number,
  ea: number,
  // - (추가적 - 내부로직) 해당 시점의 마켓 to USDT ( 환산가격 )
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
      avgPrice: 9500,
      // 현재 코인시세
      ea: 5000,
    },
    {
      name: 'ADA',
      nameKr: '에이다',
      avgPrice: 1500,
      ea: 5000,
    },
    {
      name: 'OGN',
      nameKr: '오리진 프로토콜',
      avgPrice: 1500,
      ea: 5000,
    }
  ])

  const {isLoading:coinIsLoading, data:coinData, error:coinDataError} = useCoinListQuery();

  const mapToWalletItem = (data: IWalletItem[]) => {
    return data.map((data, index) => {
      return <WalletItem data={data} key={index} />
    })
  }

  const mapToCoinListItem = (data: TCoinListItem[]) => {
    return data.map((data, index) => (<CoinListItem key={index} data={data.name} />))
  }

  return (
    <>
      <WalletSummary />
      <WalletChart />
      <WalletItemGroup>{mapToWalletItem(wallItemData)}</WalletItemGroup>
      <CoinListItemGroup>
        <ListItemFilter/>
        {coinIsLoading ? 'Loading....' : (coinDataError !== null ? 'error' : mapToCoinListItem(coinData))}
      </CoinListItemGroup>
    </>
  )
}

export default Wallet
