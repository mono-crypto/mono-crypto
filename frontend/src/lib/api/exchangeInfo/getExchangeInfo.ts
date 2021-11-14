import axios from '../apiClient'

export async function getAllExchangeInfo() {
    const response = await axios.get(`/exchange-info/recently`)
    return response.data
}