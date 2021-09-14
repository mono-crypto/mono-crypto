import {
    atom
  } from 'recoil';
import { WalletItem as TWalletItem } from '@/lib/api/types'

export type WalletListState = {
    loading: boolean
    walletItems: TWalletItem[]
}

const initialState: WalletListState = {
    loading: false,
    walletItems: [],
}
export const walletItemList = atom<WalletListState>({
    key: 'walletItemList', // unique ID (with respect to other atoms/selectors)
    default: initialState, // default value (aka initial value)
});
