import React, { useCallback } from 'react'

import WalletSummary from '@/components/WalletSummary'
import WalletItemGroup from '@/components/WalletItemGroup'
import WalletItem from '@/components/WalletItem'

import { walletRealTimeHook } from '@/hooks/walletRealTimeHook'

export interface ICryptoMarketPrices {
    [key: string]: {
        binance: {
            price: number
        }
    }
}

function WalletRealTime() {
  const { exchangeInfoData, walletItemListData, cryptoMarketPrices } = walletRealTimeHook();
  const exchangeInfoAboutDollar = useCallback(
    (data:Array<any>) => {
      if(data) {
        let USDDataArray = data[0].data.filter( (item: { cur_unit: string }) => item.cur_unit == "USD" )
        return USDDataArray[0].bkpr.replaceAll(/\,/g, '')
      }
    }, [])
  

  const mapToWalletItem = useCallback(() => {
    return walletItemListData.map((data, index) => 
      <WalletItem
        data={data}
        key={index}
        valuationAmount={(exchangeInfoData ? (cryptoMarketPrices.current[(data.ticker+data.market).toUpperCase()]?.binance.price * data.ea)*exchangeInfoAboutDollar(exchangeInfoData) : 0)
      }/>
    )
  }, [walletItemListData])

  return (
      <>
        <WalletSummary cryptoMarketPrices={cryptoMarketPrices} data={walletItemListData} exchangeInfo={exchangeInfoAboutDollar(exchangeInfoData)}/>
        <WalletItemGroup>
          {mapToWalletItem()}
        </WalletItemGroup>
      </>
  )
}

export default WalletRealTime
