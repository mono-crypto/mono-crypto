import {
    atom
  } from 'recoil';

export const exchangeInfo = atom({
    key: 'exchangeInfo', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});