import {
    atom, selector
  } from 'recoil';
import { walletItemList } from './walletListState'

const defaultSocketValue = 'wss://stream.binance.com:9443/ws/btcusdt@miniTicker'

export const socketURL = atom<string>({
    key: 'socketURL', // unique ID (with respect to other atoms/selectors)
    default: defaultSocketValue, // default value (aka initial value)
});

export const getSocketURL = selector<any>({
    key: 'getSocketURL',
    get: ({get}) => {
        const walletItems = get(walletItemList);
        console.log('getSocketURL: ', walletItems)
        const additionalUrlTicker = walletItems.reduce((acc, currentValue) => {
            return acc + "/" + (currentValue._id.toLowerCase() + 'btc' ) + "@miniTicker"
        }, "")

        return defaultSocketValue+additionalUrlTicker
    },
    set: ({set}, newValue) => {
        set(socketURL, newValue)
    }
})