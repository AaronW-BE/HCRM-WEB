<template>
    <div>
        <a-card>
            <div class="form-container">
                <a-form layout="inline" :form="searchForm" @submit="handleSearch">
                    <a-form-item label="用户名">
                        <a-input
                                v-decorator="['username', {
                                    initialValue: ''
                                }]"
                                placeholder="请输入用户名" />
                    </a-form-item>
                    <a-form-item label="姓名">
                        <a-input
                                v-decorator="['name', {
                                    initialValue: ''
                                }]"
                                placeholder="请输入用户姓名" />
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" html-type="submit" style="margin-right: 10px">查询</a-button>
                        <a-button @click="resetSearch" >重置</a-button>
                    </a-form-item>
                </a-form>
                <a-form layout="inline">
                    <a-form-item>
                        <a-button size="small" type="primary" @click="() => add_user_model = true">新建</a-button>
                    </a-form-item>
                    <a-form-item>
                        <a-button size="small" type="default">其他操作</a-button>
                    </a-form-item>
                </a-form>
            </div>
            <a-table :columns="columns" :dataSource="userList"
                     :rowKey="record => record.id"
                     :loading="loading"
                     :pagination="pagination"
                     @change="onTableChange"
            >
            <span slot="status" slot-scope="status">
                <span v-if="status === 0">
                    正常 <a-icon type="check-circle" style="color: #5ed4a5" />
                </span>
                <span v-else>
                 <a-icon type="close-circle"  style="color: #be1a00" />已封禁
                </span>
            </span>
            <span slot="action" slot-scope="user">
                <a-button type="primary" size="small" @click="viewUserDetail(user.id)">查看详情</a-button>

                <a-popconfirm title="确定封禁/解封此用户?" okText="确定" cancelText="取消" @confirm="handleBlockUser(user)">
                    <a-button v-if="user.blocked === 0" type="danger" size="small">封禁该用户</a-button>
                    <a-button v-else type="dashed" size="small">封禁该用户</a-button>
                </a-popconfirm>
                <template v-if="!user.roleName">
                    <a-button type="primary" size="small" @click="showAddRolesModel(user.id)">添加角色</a-button>
                </template>
                <template v-else>
                    <a-popconfirm
                        okText="确定"
                        @confirm="showRemoveRoleModel(user)"
                    >
                        <div slot="title">确定要移除用户的【{{user.roleName}}】角色吗</div>
                        <a-button type="danger" size="small">移除角色</a-button>
                    </a-popconfirm>
                </template>
            </span>
            </a-table>
        </a-card>
        <a-modal title="新建账户" v-model="add_user_model" @ok="addUser">
           <a-form :form="create_user">
               <a-form-item label="用户名">
                  <a-input
                          placeholder="不少于6个字符"
                          v-decorator="['username',{rules:[{required:true, message: '请输入不少于6位字符的用户名',min: 6}] }]"
                  ></a-input>
               </a-form-item>
               <a-form-item label="密码">
                   <a-input
                           type="password"
                           placeholder="不少于6个字符"
                           v-decorator="['password',{rules:[{required:true, message: '请设置不少于6位字符的密码',min: 6}] }]"
                   ></a-input>
               </a-form-item>
               <a-form-item label="姓名">
                   <a-input
                           placeholder="actual name"
                           v-decorator="['name',{rules:[{required:true, message: '请输入真实姓名'}] }]"></a-input>
               </a-form-item>
           </a-form>
        </a-modal>
        <a-modal
                title="添加角色"
                v-model="add_roles"
                @ok="addRoles"
        >
            <a-radio-group v-model="role_id">
                <a-radio v-for="i in roleList" :key="i.id" :value="i.id">{{i.name}}</a-radio>
            </a-radio-group>
        </a-modal>
    </div>
</template>

<script>
    import {API} from "../../../api";
    import {
        AddUser,
        AddUserRole,
        BlockUser,
        RemoveUserRole,
        RoleList,
        UnblockUser,
        UserList
    } from "../../../api/template";
    import {notification} from "ant-design-vue";
    import {toTime} from "../../../utils/timeConversion";

    export default {
        name: "UserList",
        data() {
            const columns = [
                {
                    title: '名称',
                    dataIndex: 'name',
                    sorter: true,
                },
                {
                    title: '用户名',
                    dataIndex: 'username',
                    sorter: true,
                },
                {
                    title: '账户角色',
                    dataIndex: 'roleName'
                },
                {
                    title: '账户状态',
                    dataIndex: 'blocked',
                    scopedSlots: {customRender: 'status'},
                },
                {
                    title: '最后登录',
                    dataIndex: 'lastLogin'
                },
                {
                    title: '创建时间',
                    dataIndex: 'createdAt'
                },
                {
                    title: '操作',
                    width: 300,
                    scopedSlots: {customRender: 'action'},
                }
            ];
            return {
                userList: [],
                searchForm: this.$form.createForm(this),
                create_user: this.$form.createForm(this),
                columns,
                loading: false,
                pagination: {
                    pageSize: 15
                },
                add_user_model: false,
                add_roles: false,
                roleList: [],
                user_id: null,
                role_id: null
            }
        },
        created() {
            this.queryUser();
        },
        methods: {
            queryUser(data = {}) {
                API(UserList, {
                    data: {
                        ...data,
                        page: this.pagination.current,
                        size: this.pagination.pageSize
                    }
                }).then(res => {
                    res.data.results.map(item => {
                        item.lastLogin = toTime(item.lastLogin);
                    })
                    this.userList = res.data.results;
                    this.pagination = {
                        current: res.data.metadata.page,
                        total: res.data.metadata.count,
                        pageSize: res.data.metadata.size,
                    };
                });
            },
            handleSearch(e) {
                e.preventDefault();
                const searchData = this.searchForm.getFieldsValue();
                this.queryUser(searchData);
            },
            resetSearch() {
                this.searchForm.resetFields();
                this.queryUser();
            },
            onTableChange(pagination) {
                this.pagination = pagination;
                this.queryUser();
            },
            handleBlockUser(user) {
                // console.log(this);
                // 未封禁，执行封禁
                const action = user.blocked === 1 ? UnblockUser : BlockUser;

                API(action, {
                    params: {
                        id: user.id
                    }
                }).then(res => {
                    console.log(res);
                    notification.success({
                        message: "操作成功"
                    });
                    this.queryUser();
                }).catch(err => {
                    console.log(err);
                    notification.error({
                        message: "操作失败"
                    });
                });
            },
            addUser() {
                this.create_user.validateFields((err,values) => {
                    if(!err) {
                        let data = {
                            ...values
                        };
                        API(AddUser,{
                            data,
                        }).then(res => {
                            // console.log(res)
                            this.$message.success(res.msg)
                            this.add_user_model = false
                            this.queryUser();
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                })
            },
            viewUserDetail(id) {
                console.log(id)
            },
            showAddRolesModel(userId) {
                this.add_roles = true
                this.user_id = userId
                API(RoleList).then(res => {
                    console.log(res);
                    this.roleList = res.data.results;
                });
            },
            addRoles() {
                API(AddUserRole,{
                    params: {
                        id: this.user_id,
                    },
                    data: {
                        roleId:this.role_id
                    }
                }).then(res => {
                    // console.log(res)
                    this.$message.success(res.msg)
                    this.queryUser();
                }).catch(err => {
                    console.log(err)
                }).finally(() => {
                    this.add_roles = false;
                })
            },
            showRemoveRoleModel(e) {
                API(RemoveUserRole,{
                    params:{
                        id:e.id
                    },
                    data: {
                        roleId:e.roleId
                    }
                }).then(res => {
                    console.log(res)
                    this.$message.info('移除角色成功')
                    this.queryUser()
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        watch: {
            add_user_model(val) {
                if(!val) {
                    this.create_user.resetFields()
                }
            },
            add_roles(val) {
                if(!val){
                    this.user_id = null;
                    this.role_id = null
                }
            }
        }
    }
</script>

<style scoped>

</style>
