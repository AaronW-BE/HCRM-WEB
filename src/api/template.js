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
};

export const CustomerDetail = {
    method: M.GET,
    path: '/customer/:id'
};

export const CustomerOrders = {
    method: M.GET,
    path: '/customer/:id/orders'
};

export const CustomerAddTags = {
    method: M.POST,
    path: '/customer/:cid/tag'
};

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

export const AddUser = {
    method: M.POST,
    path: '/user/create'
}

// ********************************************************** //
// 订单
export const CreateOrder = {
    method: M.POST,
    path: '/order/create'
};

export const OrderList = {
    method: M.GET,
    path: '/order/query'
};

export const LinkCustomer = {
    method: M.POST,
    path: '/order/:id/link'
};
export const DeleteOrder = {
    method: M.DELETE,
    path: '/order/:id'
};

export const ChangeOrder = {
    method: M.PUT,
    path: '/order/:id'
};
export const OrderDetail = {
    method: M.GET,
    path: '/order/:id'
};
//领取订单--登录用户自己领取未分配的订单
export const ReceiveOrder = {
    method: M.POST,
    path: '/order/:id/receive'
}
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
export const ModifyVisit = {
    method: M.PUT,
    path: '/customer/:cid/return-visit/:id'
}
export const DeleteVisits = {
    method: M.DELETE,
    path: '/customer/:cid/return-visit/:id'
}

/**
 * 近期回访列表
 * @type {{path: string, method: string}}
 */
export const SelfReturnVisit = {
    method: M.GET,
    path: '/user/return-list'
};

//*****************************************************************//
// TAG

export const AddTag = {
    method: M.POST,
    path: '/customer/{cid}/tag'
};

export const QueryTag = {
    method: M.GET,
    path: '/tag/query'
};


//*****************************************************************//
// 标签
export const CreateTag = {
    method: M.POST,
    path: '/tag/create'
}

export const DeleteTag = {
    method: M.DELETE,
    path: '/tag/:id'
};

//*****************************************************************//
// 角色相关
export const RoleList = {
    method: M.GET,
    path: '/role/list'
};

export const CreateRole = {
    method: M.POST,
    path: '/role/create'
};

export const AllPermission = {
    method: M.GET,
    path: '/common/permissions'
}

//*****************************************************************//
// Statistics

export const NormalStatistics = {
    method: M.GET,
    path: '/statistic/normal'
};

export const SelfBaseStatistic = {
    method: M.GET,
    path: '/statistic/self-base'
};
