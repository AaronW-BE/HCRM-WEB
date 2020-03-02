export const parsePathParams = (api, pathParams) => {
    let path = api.path;
    for (let key in pathParams) {
        api.path = path.replace(":" + key, pathParams[key]);
    }
    return api;
};