import {
  atom,
} from 'recoil';
import { User } from '@/lib/api/types';

// interface IauthState {
//   key: '',

// }

export const authState = atom<User | null>({
    key: 'authState', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
});

export const googleAccessTokenState = atom<string | null>({
  key: 'googleAccessTokenState', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
