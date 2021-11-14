import axios from '../apiClient'
import { addWalletItem as TaddWalletItem } from '../types'

export function addWalletList(params:TaddWalletItem) {
    return axios.post(`/wallet`, params)
}