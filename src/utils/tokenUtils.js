const TOKEN_PREFIX = process.env.VUE_APP_TOKEN_PREFIX || '';
const TOKEN_NAME = process.env.VUE_APP_TOKEN_KEY || 'hcrm_token';


const TokenKey = TOKEN_PREFIX + TOKEN_NAME;

/**
 * 获取token
 */
export const getToken = function () {
    return localStorage.getItem(TokenKey);
};

export const setToken = function (val) {
    localStorage.setItem(TokenKey, val);
};

/**
 * 移除token
 */
export const removeToken = function () {
    localStorage.removeItem(TokenKey);
};