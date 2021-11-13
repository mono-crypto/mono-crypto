import {
    atom, selector, useRecoilState, useRecoilValue,
} from 'recoil';
import { WalletItem } from '@/lib/api/types';
  
interface history {
    [key: string]: WalletItem[]
}
export const historyVisible = atom<boolean>({
    key: 'historyVisible',
    default: false
})

export const historyTicker = atom<string>({
    key: 'historyTicker', // unique ID (with respect to other atoms/selectors)
    default: "", // default value (aka initial value)
});

export const history = atom<history | null>({
    key: 'history', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
});

export function getHistoryTicker() {
    return useRecoilValue(historyTicker)
}

export function useHistoryTicker() {
    return useRecoilState(historyTicker)
}

export function useHistory() {
    return useRecoilState(history)
}

export function useHistoryVisible() {
    return useRecoilState(historyVisible)
}