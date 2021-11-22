import React, { useCallback } from 'react'

import WalletSummary from '@/components/WalletSummary'
import WalletItemGroup from '@/components/WalletItemGroup'
import WalletItem from '@/components/WalletItem'
import {ISummaryData} from '@/components/WalletSummary/WalletSummary'

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
  
  const exchangeInfoAboutDollar = (data:Array<any>) => {
    if(data) {
      let USDDataArray = data[0].exchangeInfoArray.filter( (item: { cur_unit: string }) => item.cur_unit == "USD" )
      return USDDataArray[0].bkpr.replaceAll(/\,/g, '')
    }
  }

  const mapToWalletItem = useCallback(() => {
    return walletItemListData.map((data, index) => 
      {
        return <WalletItem
          data={data}
          key={index}
          currentBtcToUSDPrice={Number((cryptoMarketPrices.current['BTCUSDT']?.binance.price))}
          itemPrice={Number((cryptoMarketPrices.current[data._id+'BTC']?.binance.price))}
          exchangeInfo={exchangeInfoAboutDollar(exchangeInfoData)}
        />
      }
    )
  }, [cryptoMarketPrices, exchangeInfoData, walletItemListData])

  // 전체 평가 손익 데이터
  const summaryData = useCallback(() => {
    const btcToUSDPrice = Number((cryptoMarketPrices.current['BTCUSDT']?.binance.price))
    const exchangeInfo = exchangeInfoAboutDollar(exchangeInfoData);
    let totalHoldings = 0;

    const data:Array<ISummaryData> = walletItemListData.map((item, index) => {
      const itemPrice = Number((cryptoMarketPrices.current[item._id+'BTC']?.binance.price))

      const valuationLoss = Number((itemPrice - item.convertPriceAvg)*item.ea.reduce((prev:number, cur:number) => prev+cur) * btcToUSDPrice * exchangeInfo)
      const yieldValue = Number(itemPrice / item.convertPriceAvg) * 100 - 100
      const holdingValue = (btcToUSDPrice*itemPrice) * item.ea.reduce((prev:number, cur:number) => prev+cur)

      totalHoldings += isNaN(holdingValue) ? 0 : holdingValue

      return {
        valuationLoss: isNaN(valuationLoss) ? 0 : valuationLoss,
        yieldValue: isNaN(yieldValue) ? 0 : yieldValue.toFixed(2),
      }
    })

    return {
      walletDataArray: data,
      totalHoldings: totalHoldings,
      btcToUSDPrice: btcToUSDPrice,
      exchangeInfo: exchangeInfo
    }
  }, [cryptoMarketPrices, exchangeInfoData, walletItemListData])

  return (
      <>
        <WalletSummary summaryData={summaryData()} />
        <WalletItemGroup>
          {mapToWalletItem()}
        </WalletItemGroup>
      </>
  )
}

export default WalletRealTime
