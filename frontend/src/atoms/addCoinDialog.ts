import {
    atom, DefaultValue, selector, useRecoilState, useRecoilValue, useResetRecoilState,
  } from 'recoil'

import { coinList } from '@/atoms/coinListState'

const initialState: initialState = {
  ticker: '',
  market: '',
  price: '0',
  ea: 0,
  date: '',
  visible: false,
  loading: false,
}

interface initialState {
  ticker: TTickerState
  market: TMarketState
  price: TPriceState
  ea: TEaState
  date: TDateState
  visible: TVisibleState
  loading: TloadingState
}

type TloadingState = boolean
type TVisibleState = boolean
type TTickerState = string
type TMarketState = string
type TPriceState = number | string
type TEaState = number
type TDateState = string

export const addCoinModalState = atom<initialState>({
    key: 'addCoinModalState', // unique ID (with respect to other atoms/selectors)
    default: initialState, // default value (aka initial value)
})

export const addCoinModalStateSelector = selector<initialState>({
  key: 'setAddCoinModalState',
  get: ({ get }) => get(addCoinModalState),
  set: ({ set }, newValue) => {
    set(addCoinModalState, (prev) => 
      newValue instanceof DefaultValue ? newValue : {
      ...prev,
      ...newValue
    })
  }
})

export const addCoinModalTickerState = selector<initialState['ticker']>({
  key: 'addCoinModalTickerState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => get(addCoinModalState).ticker,
  set: ({ set }, newValue) => {
    set(addCoinModalState, (prev) => 
      newValue instanceof DefaultValue ? newValue : {
      ...prev,
      ticker: newValue
    })
  }
})

export const addCoinModalMarketState = selector<initialState['market']>({
  key: 'addCoinModalMarketState', // unique ID (with respect to other selectors/selectors)
  get: ({ get }) => get(addCoinModalState).market,
  set: ({ set }, newValue) => {
    set(addCoinModalState, (prev) => 
      newValue instanceof DefaultValue ? newValue : {
      ...prev,
      market: newValue
    })
  }

})
export const addCoinModalPriceState = selector<initialState['price']>({
  key: 'addCoinModalPriceState', // unique ID (with respect to other selectors/selectors)
  get: ({ get }) => get(addCoinModalState).price,
  set: ({ set }, newValue) => {
    set(addCoinModalState, (prev) => 
      newValue instanceof DefaultValue ? newValue : {
      ...prev,
      price: newValue
    })
  }
})
export const addCoinModalEaState = selector<initialState['ea']>({
  key: 'addCoinModalEaState', // unique ID (with respect to other selectors/selectors)
  get: ({ get }) => get(addCoinModalState).ea,
  set: ({ set }, newValue) => {
    set(addCoinModalState, (prev) => 
      newValue instanceof DefaultValue ? newValue : {
      ...prev,
      ea: newValue
    })
  }
})
export const addCoinModalDateState = selector<initialState['date']>({
  key: 'addCoinModalDateState', // unique ID (with respect to other selectors/selectors)
  get: ({ get }) => get(addCoinModalState).date,
  set: ({ set }, newValue) => {
    set(addCoinModalState, (prev) => 
      newValue instanceof DefaultValue ? newValue : {
      ...prev,
      date: newValue
    })
  }
})
export const addCoinModalVisibleState = selector<initialState['visible']>({
  key: 'addCoinModalVisibleState', // unique ID (with respect to other selectors/selectors)
  get: ({ get }) => get(addCoinModalState).visible,
  set: ({ set }, newValue) => {
    set(addCoinModalState, (prev) => 
      newValue instanceof DefaultValue ? newValue : {
      ...prev,
      visible: newValue
    })
  }
})
export const addCoinModalLoadingState = selector<initialState['loading']>({
  key: 'addCoinModalLoadingState',
  get: ({ get }) => get(addCoinModalState).loading,
  set: ({ set }, newValue) => {
    set(addCoinModalState, (prev) => 
      newValue instanceof DefaultValue ? newValue : {
      ...prev,
      loading: newValue
    })
  }
})

export const coinMarketList = selector<string[]>({
  key: 'coinMarketList',
  get: ({get}) => {
    let initArray:string[] = []

    const marketDataAboutTicker = 
    get(coinList)
    .find(item => item.name === get(addCoinModalState).ticker)?.markets
    .reduce((previousValue, currentValue) => {
      const newValue = currentValue.quotes ? currentValue.quotes : []
      initArray = [...initArray, ...newValue ]
    }, initArray)

    const uniqueArr = initArray.filter((element, index) => {
      return initArray.indexOf(element) === index;
  });

    return uniqueArr
  },
});

export function useAddCoinModalState() {
  return useRecoilState(addCoinModalState)
}

export function useAddCoinModalStateSelector() {
  return useRecoilState(addCoinModalStateSelector)
}

export function useAddCoinModalTickerState() {
  return useRecoilState(addCoinModalTickerState)
}

export function useAddCoinModalMarketState() {
  return useRecoilState(addCoinModalMarketState)
}

export function useAddCoinModalPriceState() {
  return useRecoilState(addCoinModalPriceState)
}

export function useAddCoinModalEaState() {
  return useRecoilState(addCoinModalEaState)
}

export function useAddCoinModalDateState() {
  return useRecoilState(addCoinModalDateState)
}

export function useAddCoinModalVisibleState() {
  return useRecoilState(addCoinModalVisibleState)
}

export function useAddCoinModalLoadingState() {
  return useRecoilState(addCoinModalLoadingState)
}

export function useResetAddCoinModalState() {
  return useResetRecoilState(addCoinModalState)
}

export function useCoinMarketList() {
  return useRecoilValue(coinMarketList)
}