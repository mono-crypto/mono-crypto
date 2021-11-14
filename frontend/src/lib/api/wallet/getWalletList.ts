import axios from '../apiClient'
import { WalletItem } from '../types'

export async function getWalletList(id: number | undefined) {
    const response = await axios.get<WalletItem[]>(`/wallet`, {
        params: {
            id: id
        }
    })
    return response.data
}