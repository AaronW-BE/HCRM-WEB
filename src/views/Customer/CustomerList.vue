<template>
    <div>
        <a-table :columns="columns" :dataSource="list"
                 :rowKey="record => record.id"
                 :pagination="pagination"
                 @change="onTableChange"
        >
            <span slot="gender" slot-scope="gender">
                <a-icon type="man" v-if="gender" style="color: #1890ff" />
                <a-icon type="woman" v-else style="color: deeppink" />
            </span>
            <span slot="action" slot-scope="scope">
                <a-button type="primary" size="small" @click="() => console.log(scope.id)">查看详情</a-button>
                <a-button type="dashed" size="small">转交用户</a-button>
            </span>
        </a-table>
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
                },
                {
                    title: '微信号',
                    dataIndex: 'wechat',
                    sorter: true
                },
                {
                    title: '性别',
                    dataIndex: 'gender',
                    sorter: true,
                    width: 100,
                    scopedSlots: {customRender: 'gender'}
                },
                {
                    title: '组别',
                    dataIndex: 'groupName',
                    sorter: true
                },
                {
                    title: '省份',
                    dataIndex: 'province',
                    sorter: true
                },
                {
                    title: '城市',
                    dataIndex: 'city',
                    sorter: true
                },
                {
                    title: '来源',
                    dataIndex: 'original',
                    sorter: true
                },
                {
                    title: '操作',
                    width: 250,
                    scopedSlots: { customRender: 'action' },
                }
            ];
            return {
                columns,
                list: [],
                pagination: {
                    pageSize: 2
                }
            };
        },
        mounted() {
            this.queryCustomer();
        },
        methods: {
            queryCustomer(data = {}) {
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
                });
            },
            onTableChange(pagination) {
                this.pagination = pagination;
                this.queryCustomer();
            }
        }
    }
</script>

<style scoped>

</style>