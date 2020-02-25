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
                    <a-form-item>
                        <a-button type="primary" html-type="submit" style="margin-right: 10px">查询</a-button>
                        <a-button @click="resetSearch" >重置</a-button>
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
                <a-button type="primary" size="small" @click="() => console.log(user.id)">查看详情</a-button>

                <a-popconfirm title="确定封禁/解封此用户?" okText="确定" cancelText="取消" @confirm="handleBlockUser(user)">
                    <a-button v-if="user.blocked === 0" type="danger" size="small">封禁该用户</a-button>
                    <a-button v-else type="dashed" size="small">封禁该用户</a-button>
                </a-popconfirm>
            </span>
            </a-table>
        </a-card>
    </div>
</template>

<script>
    import {API} from "../../../api";
    import {BlockUser, UnblockUser, UserList} from "../../../api/template";
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
                    width: 250,
                    scopedSlots: {customRender: 'action'},
                }
            ];
            return {
                userList: [],
                searchForm: this.$form.createForm(this),
                columns,
                loading: false,
                pagination: {
                    pageSize: 15
                }
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
                console.log(this);
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
            }
        }
    }
</script>

<style scoped>

</style>
