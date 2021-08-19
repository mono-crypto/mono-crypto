import {
    atom,
  } from 'recoil';

interface addCoinDialogStateInterface {
  ticker?: string
  state: boolean
}

interface IloadingAddCoinDialog {
  loading: boolean
}

export const addCoinDialogState = atom<addCoinDialogStateInterface>({
    key: 'addCoinDialogState', // unique ID (with respect to other atoms/selectors)
    default: {
      ticker: '',
      state: false,
    }, // default value (aka initial value)
});

export const loadingAddCoinDialog = atom<IloadingAddCoinDialog>({
  key: 'loadingAddCoinDailog',
  default: {
    loading: false,
  }
})
