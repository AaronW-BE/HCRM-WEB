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
                    <a-button size="small" type="primary" @click="$router.push({name: 'CreateOrder'})">创建</a-button>
                </div>
            </div>
            <a-table :dataSource="orderList" :columns="columns"
                     :loading="loading"
                     :rowKey="record => record.id"
                     :pagination="pagination"
                     @change="handleChange"
            >
                <span slot="customer" slot-scope="row">
                    <a v-if="row.customerId" title="点击查看客户" @click="redirect2CustomerDetail(row.customerId)">{{row.customer}}</a>
                    <a-button v-else type="primary" size="small" @click="handleShowSearchCustomer(row)">关联客户</a-button>
                </span>
                <span slot="action" slot-scope="order">
                    <a :data-id="order.id" @click="$router.push({name: 'CreateOrder', params: {id: order.id}})">修改</a>
                    <a :data-id="order.id" @click="$router.push({name: 'orderDetail', params: {id: order.id}})" style="margin-left: 10px">详情</a>
                    <a-popconfirm
                            title="确定删除此订单吗？"
                            @confirm="deleteOrder(order.id)"
                            okText="确定"
                            cancelText="取消"
                    >
                        <a style="margin-left: 10px">删除</a>
                    </a-popconfirm>
                    <a-popconfirm
                        title="请确保领取的为自己的订单"
                        okText="是我的订单"
                        cancelText="取消"
                        @confirm="handleReceiveOrder(order.id)"
                    >
                        <a-button type="link" v-if="!order.creatorId" style="color: #40b95b">領取訂單</a-button>
                    </a-popconfirm>
                </span>
            </a-table>
        </a-card>
        <customer-search-dialog :show.sync="showLinkCustomer" @selected="handleCustomerSelect" />
    </div>
</template>

<script>
    import {API} from "../../api";
    import {DeleteOrder, LinkCustomer, OrderList, ReceiveOrder} from "../../api/template";
    import CustomerSearchDialog from "../../components/CustomerSearchDialog";

    import {message} from 'ant-design-vue';

    export default {
        name: "OrderList",
        components: {CustomerSearchDialog},
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
                selectedOrder: null,
                showLinkCustomer: false,
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
            handleReceiveOrder(id) {
                API(ReceiveOrder, {
                    params: {id}
                    // eslint-disable-next-line no-unused-vars
                }).then(res => {
                    this.$message.success('领取成功')
                    this.queryOrderList();
                });
            },
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
                this.$router.push({
                    name: 'customerDetail',
                    params: {
                        id
                    }
                })
            },
            handleShowSearchCustomer(order) {
                this.selectedOrder = order;
                this.showLinkCustomer = true;
            },
            handleCustomerSelect(data) {
                console.log(data);

                API(LinkCustomer, {
                    params: {
                        id: this.selectedOrder.id,
                    },
                    data: {
                        cid: data.id
                    }
                }).then(res => {
                    console.log(res);
                    message.success("关联客户成功");
                    this.showLinkCustomer = false;
                    this.queryOrderList();
                }).catch(err => {
                    message.error("关联失败");
                    console.log(err);
                }).finally(() => {
                    this.selectedOrder = null;
                });
            },
            deleteOrder(order) {
                let id = order
                API(DeleteOrder,{
                    params: {
                        id,
                    }
                }).then(res => {
                    console.log(res)
                    this.$message.info('删除成功')
                    this.queryOrderList();
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
</style>
