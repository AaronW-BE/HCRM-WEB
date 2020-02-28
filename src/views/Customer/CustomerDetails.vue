<template>
    <div>
        <a-card title="客户信息" style="margin-bottom: 15px">
            147
        </a-card>
        <a-card title="订单信息" style="margin-bottom: 15px">
            258
        </a-card>
        <a-card title="客户回访">
            <ReturnVisit :customer_id="customer_id"></ReturnVisit>
        </a-card>
    </div>
</template>

<script>
    import ReturnVisit from "../../components/ReturnVisit";

    export default {
        name: "CustomerDetails",
        components: {ReturnVisit},
        data() {
            return{
                customer_id: undefined
            }
        },
        created() {
            this.customer_id = this.$route.params.customer_id
        },
        methods:{
            handleTabsChange(val) {
                console.log(val)
            }
        },

    }
</script>

<style scoped>

</style>
