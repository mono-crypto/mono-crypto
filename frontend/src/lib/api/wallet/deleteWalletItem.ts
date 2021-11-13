import axios from 'axios'

export interface deleteItemParams {
    access_token: string | undefined
    ticker: string
}

export async function deleteWalletItem(params:deleteItemParams) {
    const response = await axios.delete(`/wallet`, {
        data: {
            access_token: params.access_token,
            ticker: params.ticker
        }
    })
    
    return response.data
}