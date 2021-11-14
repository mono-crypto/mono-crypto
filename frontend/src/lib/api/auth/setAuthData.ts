import axios from '../apiClient'

export async function setAuthData(token: string, data: any) {
    const response = await axios.post(`/auth/google/signup`, {
        access_token: token,
        user_data: data 
    })

    return response.data
}