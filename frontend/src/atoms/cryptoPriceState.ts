import {
    atom
  } from 'recoil';

export interface ICryptoMarketPrices {
    [key: string]: {
        binance: {
            price: number
        }
    }
}

export const cryptoPriceState = atom<string>({
    key: 'cryptoPriceState', // unique ID (with respect to other atoms/selectors)
    default: "", // default value (aka initial value)
});
