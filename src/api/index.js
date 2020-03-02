import {DELETE, GET, POST, PUT, UploadFile} from "../utils/request";
import {parsePathParams} from "../utils/pathUtil";

export function API(api, options = {}) {
    let _api = {...api};
    const method = _api.method.toLowerCase();
    if (options.params) {
        _api = parsePathParams(_api, options.params);
    }
    const data = options.data;
    switch (method) {
        case 'get':
            return GET(_api.path, data);
        case 'post':
            return POST(_api.path, data);
        case 'put':
            return PUT(_api.path, data);
        case 'delete':
            return DELETE(_api.path, data);
        case 'file':
            if (!options.name) {
                throw new Error("file input field name invalid");
            }
            if (!options.file) {
                throw new Error("file invalid");
            }
            return UploadFile(_api.path, options.name, options.file);
    }
}
