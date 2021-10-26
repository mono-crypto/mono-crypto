import {
    atom,
    selector,
    useRecoilState
  } from 'recoil';

import { CoinListItem as TCoinListItem } from '@/lib/api/types'

export const coinListFilterInput = atom({
    key: 'filterInput', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});

export const coinList = atom<TCoinListItem[]>({
    key: 'coinList', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const coinListFilter = selector({
    key: 'coinListFilter',
    get: ({get}) => {
        if(get(coinListFilterInput).length > 0) return get(coinList).filter(item => item.name.includes(get(coinListFilterInput).trim().toUpperCase()))
        else return get(coinList)
    },
});

export function useConinList() {
  return useRecoilState(coinList)
}