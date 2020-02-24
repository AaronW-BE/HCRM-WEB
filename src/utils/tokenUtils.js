const TOKEN_PREFIX = process.env.VUE_APP_TOKEN_PREFIX || '';
const TOKEN_NAME = process.env.VUE_APP_TOKEN_KEY || 'hcrm_token';
const TokenKey = TOKEN_PREFIX + TOKEN_NAME;

/**
 * 获取token
 */
export const getToken = function () {
    const storeVal = localStorage.getItem(TokenKey);
    if (!storeVal) {
        return "";
    }
    try {
        const storeObj = JSON.parse(storeVal);
        if (!storeObj.t || !storeObj.v || !storeObj.e) {
            return "";
        }
        if (Date.now() >= storeObj.t + parseInt(storeObj.e) * 1000) {
            return "";
        }
        return storeObj.v;
    } catch (e) {
        return "";
    }
};

export const setToken = function (val, expire) {
    const obj = {
        v: val,
        t: Date.now(),
        e: expire
    };
    localStorage.setItem(TokenKey, JSON.stringify(obj));
};

/**
 * 移除token
 */
export const removeToken = function () {
    localStorage.removeItem(TokenKey);
};