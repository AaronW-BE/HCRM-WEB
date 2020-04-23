<template>
    <div>
        <a-card>
            <div class="form-container">
                <a-button @click="requestVdOrders" type="primary">获取微店订单</a-button>
                <a-button type="danger" style="float: right">
                    <a target="_blank" href="https://d.weidian.com/weidian-pc/pc-vue-order/?spider_token=32dd#/orderList?listType=1">进入微店</a>
                </a-button>
            </div>
            <div>
                <a-table
                        :dataSource="vdOrders"
                        :columns="columns" :pagination="pagination"
                        @change="onTableChange"
                        :loading="isLoading"
                        :rowKey="row => row.order_id">
                    <template slot="img" slot-scope="img">
                        <img :src="img" alt="" class="goods-cover-img">
                    </template>

                    <template slot-scope="buyer" slot="buyer">
                        <div>{{buyer.name}} {{buyer.phone}}</div>
                        <div>{{buyer.address}}</div>
                    </template>
                    <template slot-scope="time" slot="time">
                        {{
                        new Date(time).toLocaleString()
                        }}
                    </template>

                    <template slot="action" slot-scope="row">
                        <a-button-group>
                            <a-button type="primary" @click="handleDetail(row.order_id)">详情</a-button>
                            <a-button v-if="!row.exists" @click="handleImportOrder(row.order_id)">导入到系统</a-button>
                        </a-button-group>
                    </template>
                </a-table>
            </div>
        </a-card>

        <a-modal
            :visible="showOrderDetailDialog"
            title="订单详情"
            :closable="false"
        >
            <vd-order-detail :order-id="selectedOrderId"></vd-order-detail>
            <div slot="footer">
                <a-button type="primary" @click="showOrderDetailDialog = false">确定</a-button>
            </div>
        </a-modal>
    </div>
</template>

<script>
    import {API} from "../../../api";
    import {VdGetOrderList, VdImportOrder} from "../../../api/template";
    import VdOrderDetail from "./vdOrderDetail";

    export default {
        name: "vdOrderList",
        components: {VdOrderDetail},
        data() {
            return {
                isLoading: false,
                vdOrders: [],
                columns: [
                    {
                        title: '订单id',
                        dataIndex: 'order_id',
                        width: 100,
                    },
                    {
                        title: '商品封面',
                        dataIndex: 'img',
                        width: 120,
                        scopedSlots: {customRender: 'img'}
                    },
                    {
                        title: "付款金额",
                        dataIndex: "total",
                        width: 100,
                    },
                    {
                        title: "买家信息",
                        dataIndex: 'buyer_info',
                        scopedSlots: {customRender: 'buyer'}
                    },
                    {
                        title: '下单时间',
                        dataIndex: 'time',
                        width: 150,
                        scopedSlots: {customRender: 'time'}
                    },
                    {
                        title: '买家备注',
                        dataIndex: 'buyer_note',
                        width: 200,
                    },
                    {
                        title: '卖家备注',
                        dataIndex: 'seller_note',
                        width: 200,
                    },
                    {
                        title: "操作",
                        scopedSlots: {customRender: "action"}
                    }
                ],
                pagination: {
                    pageSize: 30,
                    current: 1,
                    total: 0
                },
                selectedOrderId: null,
                showOrderDetailDialog: false
            }
        },
        methods: {
            requestVdOrders() {
                this.isLoading = true;
                API(VdGetOrderList, {
                    data: {
                        page: this.pagination.current,
                        size: this.pagination.pageSize
                    }
                }).then(res => {
                    this.isLoading = false;
                    this.vdOrders = res.data.orders;
                    this.pagination.total = res.data['total_num'];
                });
            },
            onTableChange(pagination) {
                console.log(pagination);
                this.pagination = pagination;
                this.requestVdOrders();
            },
            handleDetail(orderId) {
                this.showOrderDetailDialog = true
                this.selectedOrderId = orderId;
                this.$nextTick(() => {
                    this.selectedOrderId = orderId;
                });
            },
            handleImportOrder(orderId) {
                API(VdImportOrder, {
                    data: {
                        orderId
                    }
                }).then(res => {
                    const {msg} = res;
                    const {orderId} = res.data;
                    this.$notification.success({
                        message: "提示",
                        description: msg,
                        duration: 1,
                        btn: h => {
                            return h('a-button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                on: {
                                    click: ()=> {
                                        this.$router.push({name: 'orderDetail', params: {id: orderId}})
                                    }
                                }
                            }, '查看订单')
                        }
                    })
                }).catch(e => {
                    console.log(e);
                });
            },
        }
    }
</script>

<style scoped>
    .goods-cover-img {
        width: 80px;
    }
</style>