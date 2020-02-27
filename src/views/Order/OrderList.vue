<template>
    <div>
        <a-card>
            <div class="form-container">
                <a-form layout="inline" :form="searchForm" @submit="handleSearch">
                    <a-form-item label="下单人">
                        <a-input
                                v-decorator="['orderName', {
                                    initialValue: ''
                                }]"
                                placeholder="请输入下单人姓名" />
                    </a-form-item>
                    <a-form-item label="订单号">
                        <a-input
                                v-decorator="['orderNo', {
                                    initialValue: ''
                                }]"
                                placeholder=请输入查询的订单号 />
                    </a-form-item>
                    <a-form-item label="订单来源">
                        <a-input
                                v-decorator="['original', {
                                    initialValue: ''
                                }]"
                                placeholder=请输入查询的订单来源 />
                    </a-form-item>
                    <template v-if="moreSearchFields">
                        <a-form-item label="创建时间">
                            <a-input
                                    v-decorator="['createTime', {
                                    initialValue: ''
                                }]"
                                    placeholder="请输入创建时间" />
                        </a-form-item>
                    </template>
                    <a-form-item>
                        <a-button type="primary" html-type="submit" style="margin-right: 10px">查询</a-button>
                        <a-button @click="resetSearch" >重置</a-button>
                        <span>
                            <a @click="moreSearchFields = !moreSearchFields"> {{ moreSearchFields ? '收起': '查询更多' }}
                                <a-icon :type="moreSearchFields ? 'up' : 'down'" />
                            </a>
                        </span>
                    </a-form-item>
                </a-form>
                <div>
                    <a-button size="small" type="primary">创建</a-button>
                </div>
            </div>
            <a-table :dataSource="orderList" :columns="columns"
                     :loading="loading"
                     :rowKey="record => record.id"
                     :pagination="pagination"
                     @change="handleChange"
            >
                <span slot="customer" slot-scope="row">
                    <a @click="redirect2CustomerDetail(row.customerId)">{{row.customer}}</a>
                </span>
                <span slot="action" slot-scope="order">
                    <a :data-id="order.id" @click="$router.push({name: 'orderDetail', params: {id: order.id}})">详情</a>
                </span>
            </a-table>
        </a-card>
    </div>
</template>

<script>
    import {API} from "../../api";
    import {OrderList} from "../../api/template";

    export default {
        name: "OrderList",
        data() {
            const columns = [
                {
                    title: '下单人',
                    dataIndex: 'orderName',
                    width: 120,
                },
                {
                    title: '关联客户',
                    width: 120,
                    scopedSlots: { customRender: 'customer' },
                },
                {
                    title: '金额',
                    dataIndex: 'orderAmount',
                    width: 100
                },
                {
                    title: '订单号',
                    dataIndex: 'orderNo',
                },
                {
                    title: '下单手机号',
                    dataIndex: 'orderPhone',
                },
                {
                    title: '下单时间',
                    dataIndex: 'orderTime',
                    customRender(scopedSlot) {
                        if (scopedSlot) {
                            return new Date(scopedSlot).toLocaleString();
                        }
                    }
                },
                {
                    title: '来源',
                    dataIndex: 'original',
                    width: 120
                },
                {
                    title: '创建时间',
                    dataIndex: 'createAt',
                    customRender(scopedSlot) {
                        if (scopedSlot) {
                            return new Date(scopedSlot).toLocaleString();
                        }
                    }
                },
                {
                    title: '操作',
                    width: 200,
                    scopedSlots: { customRender: 'action' },
                }
            ];
            return {
                searchForm: this.$form.createForm(this),
                moreSearchFields: false,
                loading: false,
                orderList: [],
                columns: columns,
                pagination: {
                    pageSize: 15,
                }
            };
        },
        mounted() {
            this.queryOrderList();
        },
        methods: {
            queryOrderList() {
                this.loading = true;

                const searchData = this.searchForm.getFieldsValue();
                let data = {
                    ...searchData,
                    size: this.pagination.pageSize,
                    page: this.pagination.current,
                };

                API(OrderList, {
                    data
                }).then(res => {
                    console.log(res);
                    this.orderList = res.data.results;

                    this.pagination = {
                        current: res.data.metadata.page,
                        total: res.data.metadata.count,
                        pageSize: res.data.metadata.size,
                    }
                }).finally(() => {
                    this.loading = false;
                });
            },
            handleSearch(e) {
                e.preventDefault();
                this.queryOrderList();
            },
            resetSearch() {
                this.searchForm.resetFields();
                this.queryOrderList();
            },
            handleChange(pagination) {
                this.pagination = pagination;
                this.queryOrderList();
            },
            redirect2CustomerDetail(id) {
                console.log(id)
            }
        }
    }
</script>

<style scoped>
</style>