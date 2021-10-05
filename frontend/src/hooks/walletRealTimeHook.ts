import { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import useWebSocket from 'react-use-websocket'

import { useExchangeInfoQuery } from '@/hooks/query/useExchangeInfoQuery'
import { useWalletListQuery } from '@/hooks/query/useWalletListQuery';

import { exchangeInfo } from '@/atoms/exchangeInfo'
import { walletItemList } from '@/atoms/walletListState'
import { cryptoPriceState } from '@/atoms/cryptoPriceState';

import { ICryptoMarketPrices } from '@/components/WalletRealTime/WalletRealTime';

export function walletRealTimeHook() {
    const defaultSocketUrl = 'wss://stream.binance.com:9443/ws/btcusdt@miniTicker'
    const [socketUrl, setSocketUrl] = useState(defaultSocketUrl);

    const [exchangInfoData, setExchangeInfo] = useRecoilState(exchangeInfo)
    const [walletItemListData, setWalletItemListData] = useRecoilState(walletItemList)
    const [cryptoMarketPricesData, setCryptoMarketPricesData] = useRecoilState(cryptoPriceState)

    const {isLoading:allExchangeInfoLoading, data:allExchangeInfoData, error:allExchangeInfoError} = useExchangeInfoQuery();
    const {isLoading:walletListLoading, data:walletListData, error:walletListError} = useWalletListQuery();

    const {
      sendMessage,
      lastMessage,
      readyState,
    } = useWebSocket(socketUrl);
    
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

    useEffect(() => {
        setCryptoMarketPricesData(lastMessage?.data)
    }, [lastMessage])

    useEffect(() => {
        console.log('walletRealTimeHook useEffect ExchangeInfo')
        if (allExchangeInfoData) {
            setExchangeInfo(allExchangeInfoData)
        }
    }, [allExchangeInfoData])

    useEffect(() => {
        console.log('walletRealTimeHook useEffect walletItemListData')
        if (walletListData) {
            let summaryValue = 0
            const additionalUrlTicker = walletListData.reduce((acc, currentValue) => {
                return acc + "/" + (currentValue.ticker.toLowerCase() + currentValue.market.toLowerCase()) + "@miniTicker"
            }, "")

            setSocketUrl(defaultSocketUrl+additionalUrlTicker)
            setWalletItemListData(walletListData)
            // summaryValue
        }
    }, [walletListData])

    useEffect(() => {
        console.log('walletRealTimeHook useEffect websocket')
        if (walletListData) {
            setWalletItemListData(walletListData)
        }
    }, [walletListData])

    return {
        exchangeInfoData: exchangInfoData || allExchangeInfoData,
        walletItemListData: walletItemListData,
        cryptoMarketPrices: cryptoMarketPrices
    }
}