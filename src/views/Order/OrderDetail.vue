<template>
    <div>
        <a-card>
            <a-skeleton active :loading="loading" >
                <div>
                    <data-detail-list title="基础信息">
                        <item term="订单号">{{detail.orderNo}}</item>
                        <item term="下单人">{{detail.orderName}}</item>
                        <item term="下单时间">{{detail.orderTime || '下单时间未知'}}</item>
                    </data-detail-list>
                    <a-divider></a-divider>
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