import axios from 'axios'
import { CoinListItem } from '../types'

export async function getCoinList() {
    const response = await axios.get<CoinListItem[]>(`/coin`)
    return response.data
}