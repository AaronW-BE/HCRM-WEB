<template>
    <div>
        <a-card title="客户信息" style="margin-bottom: 15px">
            <data-detail-list>
                <Item term="标签">
                    <a-tag v-for="tag in detail.tags" :key="tag.name" :color="tag.type">{{tag.name}}</a-tag>
                </Item>
            </data-detail-list>
        </a-card>
        <a-card title="订单信息" style="margin-bottom: 15px">
            258
        </a-card>
        <a-card title="客户回访">
            <ReturnVisit :customer_id="id"></ReturnVisit>
        </a-card>
    </div>
</template>

<script>
    import ReturnVisit from "../../components/ReturnVisit";
    import DataDetailList from "../../components/tool/DataDetailList";
    import {API} from "../../api";
    import {CustomerDetail} from "../../api/template";

    const Item = DataDetailList.Item;

    export default {
        name: "CustomerDetail",
        components: {DataDetailList, ReturnVisit, Item},
        props: {
            id: {
                required: true,
                type: String
            }
        },
        data() {
            return{
                detail: {}
            }
        },
        mounted() {
            this.getCustomerDetail();
        },
        methods:{
            getCustomerDetail() {
                API(CustomerDetail, {
                    params: {
                        id: this.id
                    }
                }).then(res => {
                    this.detail = res.data;
                });
            },
            handleTabsChange(val) {
                console.log(val)
            }
        },

    }
</script>

<style scoped>

</style>
