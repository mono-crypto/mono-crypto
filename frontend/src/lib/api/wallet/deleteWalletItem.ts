import axios from 'axios'

export async function deleteWalletItem(id: string) {
    const response = await axios.delete(`/wallet`, {
        data: {
            ObjectId: id
        }
    })
    
    return response.data
}