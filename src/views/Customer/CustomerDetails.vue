<template>
    <div>
        <a-card title="客户信息" style="margin-bottom: 15px">
            147
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

    export default {
        name: "CustomerDetails",
        components: {ReturnVisit},
        props: {
            id: {
                required: true,
                type: String
            }
        },
        data() {
            return{
            }
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
