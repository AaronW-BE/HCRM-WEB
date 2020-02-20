import {DELETE, GET, POST, PUT, UploadFile} from "../utils/request";
import {parsePathParams} from "../utils/pathUtil";

export function API(api,options = {}) {
    const method = api.method.toLowerCase();
    if (options.pathParams) {
        parsePathParams(api, options.pathParams);
    }
    const data = options.data;
    switch (method) {
        case 'get':
            return GET(api.path, data);
        case 'post':
            return POST(api.path, data);
        case 'put':
            return PUT(api.path, data);
        case 'delete':
            return DELETE(api.path, data);
        case 'file':
            return UploadFile(api.path, api.name, api.file);
    }
}
