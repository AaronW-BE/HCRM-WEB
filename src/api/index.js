// import axios from 'axios';
// Todo 定义 base url

function GET(path, data) {
    console.log("get %s, data is %s", path, data);
}

function POST(path, data) {
    console.log("post %s, data is %s", path, data);
}

/**
 * 用于上传文件
 */
// eslint-disable-next-line no-unused-vars
function UPLOAD() {

}

export function request(api, data) {
    if (api.method.toLowerCase() === 'get') {
        return GET(api.path, data);
    } else {
        return POST(api.path, data);
    }
}