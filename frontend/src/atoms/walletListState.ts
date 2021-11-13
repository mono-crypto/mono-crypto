import {
    atom, selector, useRecoilValue
  } from 'recoil';
import { WalletItem as TWalletItem } from '@/lib/api/types'

import { getAuthState } from './authState'

// type 설정필요
export const walletItemList = atom<any>({
    key: 'walletItemList', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const getWalletItemList = selector<any>({
  key: 'getWalletItemList', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const authState = getAuthState()
  },
  set: ({set}, newValue) => {
    set(walletItemList, newValue)
  }
});

export function getWalletItemsList() {
  return useRecoilValue(walletItemList)
}