const M = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
};

export const Login = {
    method: M.POST,
    path: '/auth/login'
};

export const LoginInfo = {
    method: M.POST,
    path: '/auth/login-info'
};

// ********************************************************** //
// 客户api
/**
 * 客户列表查询
 * @type {{path: string, method: string}}
 */
export const CustomerList = {
    method: M.GET,
    path: '/customer/query'
};

// ********************************************************** //
// 后台用户api
export const UserList = {
    method: M.GET,
    path: '/user/query'
};

export const BlockUser = {
    method: M.POST,
    path: '/user/:id/block'
};

export const UnblockUser = {
    method: M.POST,
    path: '/user/:id/unblock'
};