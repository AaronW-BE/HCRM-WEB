import Axios from 'axios'
import {getToken, removeToken} from "./tokenUtils";

Axios.defaults.baseURL = '';

// Axios全局配置
Axios.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = token;
    }

    // if (process.env.VUE_APP_DEBUG) {
    //     info(config.url, config.method, config.data || config.params, config.headers);
    // }
    return config;
}, error => {
    return Promise.reject(error)
});

Axios.interceptors.response.use(response => {
    if (response.status === 401) {
        alert("未登录");
        removeToken()
    }
    return response;
}, function(error){
    return Promise.reject(error);
});

/**
 *
 * @param url 请求地址，例如：url=/api/post/1 或 url=/api/post?id=2
 * @param data, query参数，如 {id: 2}
 * @param headers
 * @returns {Promise<AxiosResponse<T>>}
 * @constructor
 */
export const GET = (url, data = {}, headers = {}) => {
    return Axios.get(url, {
        params: data,
        headers
    })
};

export const POST = (url, data, headers = {}) => {
    if (process.env.VUE_APP_DEBUG) {
        console.log(url, 'post', data, headers);
    }

    headers = {
        ...headers,
        'Content-Type': 'application/json'
    };

    let keys = Object.keys(data);
    let _data = {};
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let value = typeof data[key] !== "number" ? data[key] : String(data[key]);
        _data[key] = value;
    }
    return Axios.post(url, data, {
        headers,
    })
};

export const UploadFile = (url, name, file, headers = {}) => {
    let data = new FormData();
    data.append(name, file);
    return POST(url, data, {
        ...headers,
        'Content-Type': 'multipart/form-data'
    })
};


export const PUT = (url, data, headers = {}) => {
    return Axios.put(url, data, {
        headers
    })
};

export const DELETE = (url, data, headers = {}) => {
    return Axios.delete(url, {
        headers,
        params: data
    })
};


export const request = (
    url, method, data, headers
) => {
    console.log(url, method, data, headers)
    switch (method.toLowerCase()) {
        case 'get':
            return GET(url, data, headers);
        case 'post':
            return POST(url, data, headers);
        case 'put':
            return PUT(url, data, headers);
        case 'delete':
            return DELETE(url, data, headers);
        default:
            throw Error("unsupported method")
    }
};