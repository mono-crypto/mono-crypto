import axios from 'axios';
import authStorage from '@/lib/storage/authStorage'

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? '/api' : ''
axiosInstance.defaults.validateStatus = function (status) {
  return status >= 200 && status < 300 || status == 401;
},

// Add a response interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const user = authStorage.get()
    config.headers.Authorization = user?.access_token
    return config
  }
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    if(response.status == 401) {
      authStorage.clean()
      alert('토큰이 만료됐습니다.')
      window.location.reload();
    }
    return response
  }
)

export default axiosInstance;