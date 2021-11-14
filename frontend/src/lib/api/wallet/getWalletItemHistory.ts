import axios from '../apiClient'
import { User, WalletItem } from '../types'

interface params {
    user: User,
    ticker: string
}

export async function getWalletItemHistory(params: params) {
    const response = await axios.get(`/wallet/${params.ticker}/history`, {
        params: {
            id: params.user.google_id
        }
    })
    return response.data
}