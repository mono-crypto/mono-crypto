import axios from '../apiClient'

export async function signIn(token: string) {
    const response = await axios.post('/auth/google/signin', {
        access_token: token,
    })

    return response.data
}