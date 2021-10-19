import {
    atom
  } from 'recoil';
import { WalletItem as TWalletItem } from '@/lib/api/types'

export const walletItemList = atom<TWalletItem[] | []>({
    key: 'walletItemList', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});
