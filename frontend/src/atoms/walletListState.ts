import {
    atom, useSetRecoilState
  } from 'recoil';
import { WalletItem as TWalletItem } from '@/lib/api/types'
import { getWalletList } from '@/lib/api/wallet/getWalletList'

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
