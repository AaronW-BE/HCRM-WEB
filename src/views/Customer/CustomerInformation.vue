<template>
    <a-card>
        <a-tabs defaultActiveKey="1">
            <a-tab-pane tab="手动添加客户" key="1">
                <AddingCustomersManually></AddingCustomersManually>
            </a-tab-pane>
            <a-tab-pane tab="批量导入客户" key="2" forceRender>
                <ImportCustomers></ImportCustomers>
            </a-tab-pane>
        </a-tabs>
    </a-card>
</template>

<script>
    import AddingCustomersManually from "../../components/customer/AddingCustomersManually";
    import ImportCustomers from "../../components/customer/ImportCustomers";

    export default {
        name: "CustomerInformation",
        components: {ImportCustomers, AddingCustomersManually},
        data() {
            return{
            }
        },
        created() {

        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
