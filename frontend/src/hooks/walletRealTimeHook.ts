import { useEffect, useMemo, useRef } from 'react';
import { useRecoilState } from 'recoil';
import useWebSocket from 'react-use-websocket'

import { useExchangeInfoQuery } from '@/hooks/query/useExchangeInfoQuery'

import { exchangeInfo } from '@/atoms/exchangeInfo'
import { walletItemList } from '@/atoms/walletListState'
import { cryptoPriceState } from '@/atoms/cryptoPriceState';

import { ICryptoMarketPrices } from '@/components/WalletRealTime/WalletRealTime';
import { getSocketURL } from '@/atoms/socketState';

export function walletRealTimeHook() {
    const [exchangInfoData, setExchangeInfo] = useRecoilState(exchangeInfo)
    const [walletItemListData] = useRecoilState(walletItemList)
    const [, setCryptoMarketPricesData] = useRecoilState(cryptoPriceState)
    const [socketURLValue] = useRecoilState(getSocketURL);
    console.log('socketURLValue: ', socketURLValue)

    const {isLoading:allExchangeInfoLoading, data:allExchangeInfoData, error:allExchangeInfoError} = useExchangeInfoQuery();

    const {
      sendMessage,
      lastMessage,
      readyState,
    } = useWebSocket(socketURLValue);
    
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
        if (allExchangeInfoData) {
            setExchangeInfo(allExchangeInfoData)
        }
    }, [allExchangeInfoData])

    return {
        exchangeInfoData: exchangInfoData || allExchangeInfoData,
        walletItemListData: walletItemListData,
        cryptoMarketPrices: cryptoMarketPrices
    }
}