import axios from '../apiClient'

export async function getAuth(token: string) {
    const response = await axios.post(`/auth/google/check`, {
        access_token: token 
    })

    return response.data
}