import axios from '../apiClient'
import { updateWalletItem as TupdateWalletItem } from '../types'

export async function updateWalletItem(params:TupdateWalletItem) {
    const response = await axios.patch(`/wallet`, params)

    return response.data
}