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
export const AddCustomer = {
    method: M.POST,
    path: '/customer/create'
}

/**
 * 转交客户
 * @type {{path: string, method: string}}
 */
export const TransferCustomer = {
    method: M.POST,
    path: '/customer/:id/transfer'
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

// ********************************************************** //
export const OrderList = {
    method: M.GET,
    path: '/order/query'
};
<<<<<<< HEAD
//**********************************************************//
// 客户回访api
export const AddReturnVisit = {
    method: M.POST,
    path: '/customer/:id/return-visit'
};

export const CustomerAllVisits = {
    method: M.GET,
    path: '/customer/:cid/return-visit'
}

export const DeleteVisits = {
    method: M.DELETE,
    path: '/customer/:cid/return-visit/:id'
}
=======

export const OrderDetail = {
    method: M.GET,
    path: '/order/:id'
};
>>>>>>> 244a67b25196c9dde671889a3533a49e15c85250
