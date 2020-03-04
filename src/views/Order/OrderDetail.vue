<template>
    <div>
        <a-card title="订单详情">
            <a-skeleton active :loading="loading" >
                <div>
                    <data-detail-list title="基础信息">
                        <item term="订单号">{{detail.orderNo}}</item>
                        <item term="下单人">{{detail.orderName}}</item>
                        <item term="下单手机">{{detail.orderPhone}}</item>
                        <item term="下单时间">{{detail.orderTime || '下单时间未知'}}</item>
                        <item term="订单来源">{{detail.original}}</item>
                        <item term="订单金额">{{detail.orderAmount}}</item>
                    </data-detail-list>

                    <data-detail-list>
                        <item term="关联客户">
                            <a @click="$router.push({name: 'customerDetail', params: {id: detail.creatorId}})" >{{detail.customer}}</a>
                        </item>
                        <item term="创建人">{{detail.creator}}</item>

                        <item term="备注">{{detail.orderRemark}}</item>
                        <item term="订单创建时间">{{ new Date(detail.createAt).toLocaleString() }}</item>
                    </data-detail-list>
                    <a-divider></a-divider>

                    <data-detail-list title="快递信息">
                        <item term="快递公司">{{detail.orderExpressCorp}}</item>
                        <item term="快递单号">{{detail.orderExpressNo}}</item>
                        <item term="订单地址">{{detail.orderAddress}}</item>
                    </data-detail-list>
                </div>
            </a-skeleton>
        </a-card>
    </div>
</template>

<script>
    import {API} from "../../api";
    import {OrderDetail} from "../../api/template";
    import DataDetailList from "../../components/tool/DataDetailList";

    const Item = DataDetailList.Item;


    export default {
        name: "OrderDetail",
        props: {
            id: {
                required: true
            }
        },
        components: {DataDetailList, Item},
        data() {
            return {
                detail: {},
                loading: false,
            };
        },
        mounted() {
            this.getOrderDetail();
        },
        methods: {
            getOrderDetail() {
                this.loading = true;
                API(OrderDetail, {
                    params: {
                        id: this.id
                    }
                }).then(res => {
                    console.log(res);
                    this.detail = res.data;
                }).catch(err => {
                    console.log(err);
                }).finally(() => this.loading = false);
            }
        }
    }
</script>

<style scoped>

</style>