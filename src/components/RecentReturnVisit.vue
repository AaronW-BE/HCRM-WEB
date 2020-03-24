<template>
    <div>
        <a-list size="small">
            <a-list-item v-for="item in list" :key="item.id">
                <a-list-item-meta :description="new Date(item.returnTime).toLocaleString()" />
                <a href="#" @click="$router.push({name: 'customerDetail', params: {'id': item.customerId}})">
                    <span style="word-break: break-all">{{item.content}}</span>
                </a>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
    export default {
        name: "RecentReturnVisit",
        props: [
            'list'
        ],
        methods: {

        }
    }
</script>

<style scoped>

</style>