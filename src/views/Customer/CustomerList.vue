<template>
    <div>
        <a-card>
            <div class="form-container">
                <a-form layout="inline" :form="searchForm" @submit="handleSearch">
                    <a-form-item label="客户姓名">
                        <a-input
                                v-decorator="['name', {
                                    initialValue: ''
                                }]"
                                placeholder="请输入客户姓名" />
                    </a-form-item>
                    <a-form-item label="微信号">
                        <a-input
                                v-decorator="['wechat', {
                                    initialValue: ''
                                }]"
                                placeholder=查询微信号 />
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" html-type="submit" style="margin-right: 10px">查询</a-button>
                        <a-button @click="resetSearch" >重置</a-button>
                    </a-form-item>
                </a-form>
                <a-form layout="inline">
                    <a-form-item>
                        <a-button size="small" type="primary" @click="addCustomer">新建</a-button>
                    </a-form-item>
                </a-form>
            </div>
            <a-table :columns="columns" :dataSource="list"
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
                <a-button type="primary" size="small" @click="viewDetails(scope.id)">查看详情</a-button>
                <a-button type="dashed" size="small">转交客户</a-button>
            </span>
            </a-table>

        </a-card>
    </div>
</template>

<script>
    import {API} from "../../api";
    import {CustomerList} from "../../api/template";

    export default {
        name: "CustomerList",
        data() {
            const columns = [
                {
                    title: '客户姓名',
                    dataIndex: 'name',
                    sorter: true,
                    width: 120,
                },
                {
                    title: '微信号',
                    dataIndex: 'wechat',
                    sorter: true,
                    width: 120,
                },
                {
                    title: '手机号',
                    dataIndex: 'phone',
                    width: 120,
                },
                {
                    title: '性别',
                    dataIndex: 'gender',
                    sorter: true,
                    width: 80,
                    scopedSlots: {customRender: 'gender'}
                },
                {
                    title: '组别',
                    dataIndex: 'groupName',
                    sorter: true,
                    width: 100
                },
                {
                    title: '省份',
                    dataIndex: 'province',
                    sorter: true,
                    width: 100
                },
                {
                    title: '城市',
                    dataIndex: 'city',
                    sorter: true,
                    width: 100
                },
                {
                    title: '来源',
                    dataIndex: 'original',
                    sorter: true,
                    width: 100
                },
                {
                    title: '操作',
                    width: 200,
                    scopedSlots: { customRender: 'action' },
                }
            ];
            return {
                searchForm: this.$form.createForm(this),
                columns,
                loading: false,
                list: [],
                pagination: {
                    pageSize: 15
                }
            };
        },
        mounted() {
            this.queryCustomer();
        },
        methods: {
            handleSearch(e) {
                e.preventDefault();
                this.searchForm.validateFields((err, values) => {
                    if (!err) {
                        this.queryCustomer(values);
                    }
                });
            },
            resetSearch() {
                this.searchForm.resetFields();
                this.queryCustomer();
            },
            queryCustomer(data = {}) {
                this.loading = true;
                const searchData = this.searchForm.getFieldsValue();
                data = {
                    ...searchData
                };
                API(CustomerList, {
                    data: {
                        size: this.pagination.pageSize,
                        page: this.pagination.current,
                        ...data
                    }
                }).then(res => {
                    this.list = res.data.results;
                    this.pagination = {
                        current: res.data.metadata.page,
                        total: res.data.metadata.count,
                        pageSize: res.data.metadata.size,
                    };
                }).finally(() => {
                    this.loading = false;
                });
            },
            onTableChange(pagination) {
                this.pagination = pagination;
                this.queryCustomer();
            },
            viewDetails(e){
                this.$router.push({
                    name: 'customerDetails',
                    params: {
                        customer_id:e
                    }
                })
            },
            addCustomer() {
                this.$router.push({
                    name: 'customerInformation'
                })
            }
        }
    }
</script>

<style scoped>

</style>
