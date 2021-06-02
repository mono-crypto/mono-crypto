import {
    atom,
    selector
  } from 'recoil';

export const coinListFilterInput = atom({
    key: 'filterInput', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});

export const coinList = atom({
    key: 'coinList', // unique ID (with respect to other atoms/selectors)
    default: ['eth', 'btc', 'bnb', 'ltc'], // default value (aka initial value)
});

export const coinListFilter = selector({
    key: 'coinListFilter',
    get: ({get}) => {
        if(get(coinListFilterInput).length > 0) return get(coinList).filter(item => item.includes(get(coinListFilterInput)))
        else return get(coinList)
    },
  });

export const coinListState = selector({
  key: 'coinListState',
  get: ({get}) => {
    const state = get(coinListFilter)

    return {
      state
    }
  }
})