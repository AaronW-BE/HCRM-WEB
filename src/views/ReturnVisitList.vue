<template>
    <a-card>
        <div class="form-container">
            <a-form layout="inline" @submit="handleSearch">
<!--                <a-form-item label="回访时间范围">-->
<!--                    <a-range-picker v-model="searchForm.returnTime" showTime />-->
<!--                </a-form-item>-->
                <a-form-item label="下次回访时间范围">
                    <a-range-picker v-model="searchForm.nextReturnTime" showTime />
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit">搜索</a-button>
                </a-form-item>
            </a-form>
        </div>
        <a-table :dataSource="list" :columns="columns" :rowKey="row => row.id" :pagination="pagination"></a-table>
    </a-card>
</template>

<script>
    import {API} from "../api";
    import {SelfReturnVisit} from "../api/template";

    export default {
        name: "ReturnVisitList",
        data() {
            return {
                columns: [
                    {
                        dataIndex: 'customerName',
                        title: '客户姓名',
                        width: 150
                    },
                    {
                        dataIndex: 'createAt',
                        title: '创建回访时间',
                        width: 250
                    },
                    {
                        dataIndex: 'content',
                        title: '内容',
                    },

                    {
                        dataIndex: 'returnTime',
                        title: '下次回访时间',
                        width: 250,

                    }
                ],
                v: null,
                list: [],
                pagination: {
                    pageSize: 15,
                },
                searchForm: {
                    returnTime: [],
                    nextReturnTime: []
                }
            };
        },
        mounted() {
            this.queryList();
        },
        methods: {
            handleSearch(e) {
                e.preventDefault();
                this.queryList();
            },
            onReturnTimeChange(date) {
                if (date.length) {
                    console.log(date[0].format());
                }
            },
            queryList() {
                let data = {};

                if (this.searchForm.returnTime.length === 2) {
                    data.returnTime = this.searchForm.returnTime[0].format("YYYY-MM-DD HH:mm:ss");
                    data.returnTimeEnd = this.searchForm.returnTime[1].format("YYYY-MM-DD HH:mm:ss");
                }

                if (this.searchForm.nextReturnTime.length === 2) {
                    data.nextStart = this.searchForm.nextReturnTime[0].format("YYYY-MM-DD HH:mm:ss");
                    data.nextEnd = this.searchForm.nextReturnTime[1].format("YYYY-MM-DD HH:mm:ss");
                }
                API(SelfReturnVisit, {
                    data
                }).then(res => {
                    console.log(res);
                    this.list = res.data.results;
                    this.pagination = {
                        current: res.data.metadata.page,
                        total: res.data.metadata.count,
                        pageSize: res.data.metadata.size,
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>