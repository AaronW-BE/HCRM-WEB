export const parsePathParams = (api, pathParams) => {
    for (let key in pathParams) {
        api.path = api.path.replace(":" + key, pathParams[key]);
    }
    return api;
};