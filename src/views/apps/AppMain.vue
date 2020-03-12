<template>
    <div>
        <a-row :gutter="24">
            <a-col :md="4">
                <a-card :hoverable="true" @click="$router.push({name: 'tagManage'})">
                    <a-card-meta title="标签管理" description="标签管理">
                        <a-icon type="tags" style="color: #7755ff" slot="avatar" />
                    </a-card-meta>
                </a-card>
            </a-col>
        </a-row>

    </div>
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
