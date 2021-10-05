import {
    atom,
  } from 'recoil';

interface IUpdateWalletDialogState {
  _id: string,
  ticker?: string,
  market?: string,
  price?: number,
  ea?: number,
  date?: string,
}

interface IUpdateWalletDialogDisplayState {
  state: boolean
}

interface IloadingUpdateWalletDialog {
  loading: boolean
}

export const updateWalletDialogState = atom<IUpdateWalletDialogState>({
    key: 'updateWalletDialogState', // unique ID (with respect to other atoms/selectors)
    default: {
      _id: '',
      ticker: '',
      market: '',
      price: 0,
      ea: 0,
      date: '',
    }, // default value (aka initial value)
});

export const updateWalletDialogDisplayState = atom<IUpdateWalletDialogDisplayState>({
  key: 'updateWalletDialogDisplayState', // unique ID (with respect to other atoms/selectors)
  default: {
    state: false
  }, // default value (aka initial value)
});

export const loadingUpdateWalletDialog = atom<IloadingUpdateWalletDialog>({
  key: 'loadingUpdateWalletDialog',
  default: {
    loading: false,
  }
})
