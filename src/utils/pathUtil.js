export const parsePathParams = (api, pathParams) => {
    let path = api.path;
    for (let key in pathParams) {
        path = path.replace(":" + key, pathParams[key]);
    }
    api.path = path;
};