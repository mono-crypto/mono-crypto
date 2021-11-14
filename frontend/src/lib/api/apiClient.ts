import axios from 'axios';
import authStorage from '@/lib/storage/authStorage'

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? '/api' : ''

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response.status)
    if(response.status == 401) {
      authStorage.clean()
      alert('토큰이 만료됐습니다.')
    }
    return response
  }
)

export default axiosInstance;