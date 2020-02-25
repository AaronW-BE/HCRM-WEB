<template>
    <div>
        <a-card>
            <div class="form-container">
                <a-form layout="inline" :form="searchForm" @submit="handleSearch">
                    <a-form-item label="客户姓名">
                        <a-input
                                v-decorator="['username', {
                                    initialValue: ''
                                }]"
                                placeholder="请输入用户名" />
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" html-type="submit" >查询</a-button>
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
            <span slot="gender" slot-scope="gender">
                <a-icon type="man" v-if="gender" style="color: #1890ff" />
                <a-icon type="woman" v-else style="color: deeppink" />
            </span>
            <span slot="action" slot-scope="scope">
                <a-button type="primary" size="small" @click="() => console.log(scope.id)">查看详情</a-button>
            </span>
            </a-table>
        </a-card>
    </div>
</template>

<script>
    import {API} from "../../../api";
    import {UserList} from "../../../api/template";

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
                    title: '最后登录',
                    dataIndex: 'lastLogin'
                },
                {
                    title: '创建',
                    dataIndex: 'createdAt'
                },
                {
                    title: '操作',
                    width: 250,
                    scopedSlots: { customRender: 'action' },
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
            queryUser() {
                API(UserList, {}).then(res => {
                    this.userList = res.data.results;
                });
            },
            handleSearch(e) {
                e.preventDefault();
            },
            resetSearch() {
                this.searchForm.resetFields();
                this.queryUser();
            },
            onTableChange(pagination) {
                this.pagination = pagination;
                this.queryUser();
            }
        }
    }
</script>

<style scoped>

</style>