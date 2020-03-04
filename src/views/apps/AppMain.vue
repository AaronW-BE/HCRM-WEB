<template>
    <a-card>
        <a-card :hoverable="true" style="width: 300px" size="small">
            <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    slot="cover"
                    style="height: 120px"
            />
            <a-card-meta title="导入数据"
                         description="This is the description">
            </a-card-meta>
            <template class="ant-card-actions" slot="actions">
                <a-icon type="close-circle" />
                <a-icon type="edit" />
            </template>
        </a-card>
    </a-card>
</template>

<script>
    export default {
        name: "AppMain",
        data() {
            return {
            }
        },
        methods: {
        },
        watch: {
        }
    }
</script>

<style scoped>

</style>
