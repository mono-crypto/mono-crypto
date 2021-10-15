import { authState } from '@/atoms/authState'
import authStorage from '@/lib/storage/authStorage'
import { MutableSnapshot } from 'recoil'

export default function initialize({set}: MutableSnapshot) {
  const user = authStorage.get()
  if (user) {
    set(authState, user)
  }
}