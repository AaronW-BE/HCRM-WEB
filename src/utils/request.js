import Axios from 'axios'
import {getToken, removeToken} from "./tokenUtils";
import {message} from "ant-design-vue";

const host = process.env.NODE_ENV === 'production' ? '/api' : '/';
Axios.defaults.baseURL = host;
Axios.defaults.timeout = 5000;

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
    /**
     * 401 未授权
     * 400 请求错误，参数错误
     * 403 无权限
     */

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    }
}, function(error){
    if (error.response) {
        if (error.response.status === 401) {
            message.warning(error.response.data.msg || "登录过期，请重新登录").then(r => console.log(r))
            removeToken()
            window.location.reload();
        }
        if (error.response.data.msg) {
            message.error(error.response.data.msg).then(r => console.log(r));
        }
    }
    return Promise.reject({
        error,
        data: error.response.data || null
    });
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
        data,
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
