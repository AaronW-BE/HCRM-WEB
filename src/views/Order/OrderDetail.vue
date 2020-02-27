<template>
    <div>
        <a-card title="订单详情">
            <a-skeleton active :loading="loading" >
                <div>
                    <a-row>
                        <a-col :xs="24" :md="12" :lg="8">
                            <span>订单号：</span>
                            <span>{{detail.orderNo}}</span>
                        </a-col>
                        <a-col :xs="24" :md="12" :lg="8">
                            <span>下单人：</span>
                            <span>{{detail.orderName}}</span>
                        </a-col>
                        <a-col :xs="24" :md="12" :lg="8">
                            <span>下单时间：</span>
                            <span>{{detail.orderTime}}</span>
                        </a-col>
                    </a-row>
                    <a-divider></a-divider>
                    <a-row>
                        <a-col :span="8">
                            <span>订单号：</span>
                            <span>{{detail.orderNo}}</span>
                        </a-col>
                        <a-col :span="8">
                            <span>下单人：</span>
                            <span>{{detail.orderName}}</span>
                        </a-col>
                    </a-row>
                </div>
            </a-skeleton>
        </a-card>
    </div>
</template>

<script>
    import {API} from "../../api";
    import {OrderDetail} from "../../api/template";


    export default {
        name: "OrderDetail",
        props: {
            id: {
                required: true
            }
        },
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