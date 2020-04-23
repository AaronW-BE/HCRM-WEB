<template>
    <a-spin :spinning="spinning">
        <div>
            <span>订单编号</span>
            <span>{{detail.order_id}}</span>
            <span>【{{detail.status_desc}}】</span>

        </div>
        <div>
            <span>总价:</span>
            <span>{{detail.price}}</span>
        </div>
        <div>
            <span>商品信息</span>
            <div v-for="goods in detail.items" :key="goods.sku_id">
               {{goods.item_name}} - {{goods.price}} - {{goods.total_price}} - <img :src="goods.img" alt="">
                <a :href="goods.url" target="_blank">查看商品</a>
            </div>

            <div>
                {{detail.express}} 【{{detail.express_no}}】
            </div>
            <div>
                <span>手机号:</span>
                <span>{{detail.user_phone}}</span>
            </div>
            <div>
                <span>支付时间：</span>
                <span>{{detail.pay_time}}</span>
            </div>
        </div>
    </a-spin>
</template>

<script>
    import {API} from "../../../api";
    import {VdGetOrderDetail} from "../../../api/template";

    export default {
        name: "vdOrderDetail",
        props: {
            orderId: String
        },
        data() {
            return {
                detail: {},
                spinning: true
            }
        },
        created() {
            this.getDetail(this.orderId);
        },
        watch: {
            orderId: function (val) {
                this.spinning = true;
                this.getDetail(val);
            }
        },
        methods: {
            getDetail(orderId) {
                API(VdGetOrderDetail, {
                    data: {
                        orderId
                    }
                }).then(res => {
                    console.log(res);
                    this.detail = res.data;
                    this.spinning = false;
                });
            },
            setOrderId(orderId) {
                this.getDetail(orderId);
            }
        }
    }
</script>

<style scoped>

</style>