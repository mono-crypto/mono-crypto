import axios from 'axios';

type MethodType = 'get' | 'post';

const call_axios = async(method:MethodType, path: string, params?: object, catchFunction?: any) => {
    let proxy_base_url = '/api';
        return axios({
            method: method,
            url: proxy_base_url,
            params: {
                path: path,
                ...params
            }
        }).catch(err => {
            console.log(err);
        });
}

export default call_axios;