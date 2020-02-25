import {DELETE, GET, POST, PUT, UploadFile} from "../utils/request";
import {parsePathParams} from "../utils/pathUtil";

export function API(api,options = {}) {
    const method = api.method.toLowerCase();
    if (options.params) {
        parsePathParams(api, options.params);
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
            if (!options.name) {
                throw new Error("file input field name invalid");
            }
            if (!options.file) {
                throw new Error("file invalid");
            }
            return UploadFile(api.path, options.name, options.file);
    }
}
