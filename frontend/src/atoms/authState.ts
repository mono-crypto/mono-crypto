import {
  atom, selector, useRecoilState, useRecoilValue,
} from 'recoil';
import { User } from '@/lib/api/types';

export const authState = atom<User | null>({
    key: 'authState', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
});

export const googleAccessTokenState = atom<string | null>({
  key: 'googleAccessTokenState', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export function getAuthState() {
  return useRecoilValue(authState)
}

export function setAuthState() {
  return useRecoilState(authState)
}