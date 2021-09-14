import React, { useRef, useMemo } from 'react'

import WalletSummary from '@/components/WalletSummary'
import WalletItemGroup from '@/components/WalletItemGroup'
import WalletItem from '@/components/WalletItem'

import { WalletItem as TWalletItem } from '@/lib/api/types'

import { walletRealTimeHook } from '@/hooks/walletRealTimeHook'

export interface ICryptoMarketPrices {
    [key: string]: {
        binance: {
            price: number
        }
    }
}

function WalletRealTime() {
    const { exchangeInfoData, walletItemListData, socketMessage } = walletRealTimeHook();
    const cryptoMarketPrices = useRef<ICryptoMarketPrices>({})

    cryptoMarketPrices.current = useMemo(() => {
        if (socketMessage === null) return cryptoMarketPrices.current
        const data = JSON.parse(socketMessage.data)
        cryptoMarketPrices.current[data.s] = {
            binance: {
                price: data.c
            }
        }
        return cryptoMarketPrices.current
    }, [socketMessage])

  const exchangeInfoAboutDollar = (data) => {
    if(data) {
      return data[0].data.filter( item => item.cur_unit == "USD" )
    }
  }

  const mapToWalletItem = (data: TWalletItem[]) => {
    return data.map((data, index) => 
      <WalletItem data={data} key={index} valuationAmount={(exchangeInfoData ? (cryptoMarketPrices.current[data.ticker+data.market]?.binance.price * data.ea)*exchangeInfoAboutDollar(exchangeInfoData)[0].bkpr.replaceAll(/\,/g, '') : 0)}/>
    )
  }

  return (
      <>
        <WalletSummary data={walletItemListData.walletItems} exchangeInfo={exchangeInfoAboutDollar(exchangeInfoData)} btcPrice={cryptoMarketPrices.current.BTCUSDT?.binance.price}/>
        <WalletItemGroup>
          {mapToWalletItem(walletItemListData.walletItems)}
        </WalletItemGroup>
      </>
  )
}

export default WalletRealTime
