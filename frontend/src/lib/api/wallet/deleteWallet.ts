import axios from '../apiClient'

export interface deleteItemParams {
    access_token: string | undefined
    ticker: string
}

export interface deleteTransactionParams extends deleteItemParams{
    _id: string,
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

export async function deleteTransaction(params:deleteTransactionParams) {
    const response = await axios.delete(`/wallet/transaction`, {
        data: {
            access_token: params.access_token,
            _id: params._id
        }
    })

    return response.data
}