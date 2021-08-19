import axios from 'axios'
import { WalletItem } from '../types'

export async function getWalletList() {
    const response = await axios.get<WalletItem[]>(`/wallet`)
    return response.data
}