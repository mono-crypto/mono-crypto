import {
    atom,
  } from 'recoil';

export const addCoinDialogState = atom({
    key: 'addCoinDialogState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});

