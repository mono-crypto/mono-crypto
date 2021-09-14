import axios from 'axios'

export async function getAllExchangeInfo() {
    const response = await axios.get(`/exchange-info/recently`)
    return response.data
}