<template>
    <div>

        <a-card>
            <input type="file" @change="fileChange"/>

            <a-button @click="requestVdOrders">获取微店订单</a-button>
            <div>
                <a-table
                        :dataSource="vdOrders"
                        :columns="columns" :pagination="pagination"
                        @change="onTableChange"
                        :rowKey="row => row.order_id">
                    <template slot="img" slot-scope="img">
                        <img :src="img" alt="">
                    </template>
                    <template slot-scope="time" slot="time">
                        {{
                            new Date(time).toLocaleString()
                        }}
                    </template>
                </a-table>
            </div>
        </a-card>
    </div>
</template>

<script>

    import {API} from "../../api";
    import {ImportOrderByExcel, VdGetOrderList} from "../../api/template";

    export default {
        name: "FileUploadTest",
        data() {
            return {
                vdOrders: [],
                columns: [
                    {
                        title: '订单id',
                        dataIndex: 'order_id',
                        width: 150,
                    },
                    {
                        title: '商品封面',
                        dataIndex: 'img',
                        width: 300,
                        scopedSlots: {customRender: 'img'}
                    },
                    {
                        title: '下单时间',
                        dataIndex: 'time',
                        width: 300,
                        scopedSlots: {customRender: 'time'}
                    },
                    {
                        title: '买家备注',
                        dataIndex: 'buyer_note',
                        width: 200,
                    },
                    {
                        title: '卖家备注',
                        dataIndex: 'seller_note',
                        width: 200,
                    },
                ],
                pagination: {
                    pageSize: 30,
                    current: 1,
                    total: 0
                }
            };
        },
        methods: {
            fileChange(e) {
                let file = e.target.files[0];
                API(ImportOrderByExcel, {
                    name: 'file',
                    file: file
                }).then(res => {
                    console.log(res);
                });
            },
            requestVdOrders() {
                API(VdGetOrderList, {
                    data: {
                        page: this.pagination.current,
                        size: this.pagination.pageSize
                    }
                }).then(res => {
                    console.log(res);
                    this.vdOrders = res.data.orders;
                    this.pagination.total = res.data['total_num'];
                });
            },
            onTableChange(pagination) {
                console.log(pagination);
                this.pagination = pagination;
                this.requestVdOrders();
            },
        }
    }
</script>

<style scoped>

</style>
