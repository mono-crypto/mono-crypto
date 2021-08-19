import axios from 'axios'
import { addWalletItem as TaddWalletItem } from '../types'

export function addWalletList(params:TaddWalletItem) {
    return axios.post(`/wallet`, params)
}