import { useExchangeInfoQuery } from '@/hooks/query/useExchangeInfoQuery'
import { exchangeInfo } from '@/atoms/exchangeInfo'
import { walletItemList } from '@/atoms/walletListState'
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { useWalletListQuery } from '@/hooks/query/useWalletListQuery';

import useWebSocket from 'react-use-websocket'

export function walletRealTimeHook() {
    const defaultSocketUrl = 'wss://stream.binance.com:9443/ws/btcusdt@miniTicker'
    const [socketUrl, setSocketUrl] = useState(defaultSocketUrl);

    const [exchangInfoData, setExchangeInfo] = useRecoilState(exchangeInfo)
    const [walletItemListData, setWalletItemListData] = useRecoilState(walletItemList)

    const {isLoading:allExchangeInfoLoading, data:allExchangeInfoData, error:allExchangeInfoError} = useExchangeInfoQuery();
    const {isLoading:walletListLoading, data:walletListData, error:walletListError} = useWalletListQuery();

    // const socketUrl = 'wss://stream.binance.com:9443/ws/btcusdt@miniTicker/xrpusdt@miniTicker'
    const {
      sendMessage,
      lastMessage,
      readyState,
    } = useWebSocket(socketUrl);

    useEffect(() => {
        console.log('walletRealTimeHook useEffect ExchangeInfo')
        if (allExchangeInfoData) {
            setExchangeInfo(allExchangeInfoData)
        }
    }, [allExchangeInfoData])

    useEffect(() => {
        console.log('walletRealTimeHook useEffect walletItemListData')
        if (walletListData) {
            const temp = {
                loading: walletItemListData.loading,
                walletItems: walletListData,
            };
            const additionalUrlTicker = walletListData.reduce((acc, currentValue) => {
                return acc + "/" + (currentValue.ticker.toLowerCase() + currentValue.market.toLowerCase()) + "@miniTicker"
            }, "")

            setSocketUrl(defaultSocketUrl+additionalUrlTicker)
            setWalletItemListData(temp)
        }
    }, [walletListData])

    useEffect(() => {
        console.log('walletRealTimeHook useEffect websocket')
        if (walletListData) {
            const temp = {
                loading: walletItemListData.loading,
                walletItems: walletListData,
            };
            setWalletItemListData(temp)
        }
    }, [walletListData])

    return {
        exchangeInfoData: exchangInfoData || allExchangeInfoData,
        walletItemListData: walletItemListData,
        socketMessage: lastMessage
    }
}