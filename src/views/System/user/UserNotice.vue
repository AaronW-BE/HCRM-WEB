<template>
    <a-card>
        <a-table
                :columns="columns"
                :dataSource="data"
                :rowKey="record => record.id"
        >
            <template slot="read" slot-scope="read">
                <a-badge status="error" v-if="!read.status"/>
            </template>
            <template slot="notice" slot-scope="item">
                <a>{{item.title}}</a>
            </template>
            <template slot="action" slot-scope="scope">
                <a-button type="primary" size="small" @click="noticeDetail(scope)" style="margin-right: 10px">详情</a-button>
                <a-button size="small" @click="read(scope)" v-if="!scope.status">标为已读</a-button>
            </template>
        </a-table>
        <a-modal
                title="通知详情"
                v-model="notice_details_model"
                @ok="notice_details_model = false"
        >
            <p><span class="title">标题:</span>{{notice_details && notice_details.title}}</p>
            <p><span class="title">时间:</span>{{notice_details && toTime(notice_details.createAt)}}</p>
            <p><span class="title">内容:</span>{{notice_details && notice_details.content}}</p>
        </a-modal>
    </a-card>
</template>

<script>
    import {API} from "../../../api";
    import {NoticeDetails, ReadNotice, UserNotice} from "../../../api/template";
    import {toTime} from "../../../utils/timeConversion";
    const columns = [
        {
            title: 'Status',
            dataIndex: '',
            scopedSlots: { customRender: 'read'},
            width:  8
        },
        {
            title: 'Title',
            dataIndex: '',
            scopedSlots: { customRender: 'notice'}
        },
        {
            title: 'Time',
            dataIndex: 'createAt',
        },
        {
            title: 'Action',
            dataIndex: '',
            scopedSlots: { customRender: 'action' } },
    ];
    export default {
        name: "UserNotice",
        data() {
            return {
                data:null,
                columns,
                notice_details_model: false,
                notice_details: '',
                tiTime: undefined
            };
        },
        computed: {
            hasSelected() {
                return this.selectedRowKeys.length > 0;
            },
        },
        created() {
            this.getUserNotice()
            this.toTime = toTime
        },
        methods: {
            getUserNotice() {
                        API(UserNotice,).then(res => {
                            console.log(res)
                            res.data.results.map(item => {
                                item.createAt = toTime(item.createAt)
                            })
                            this.data = res.data.results
                        }).catch(err => {
                            console.log(err)
                        })
                    },
            noticeDetail(e) {
                if(!e.status) {
                    this.read(e)
                }
                this.notice_details_model = true
                let id = e.id;
                API(NoticeDetails,{
                    params:{
                        id
                    }
                }).then(res => {
                    // console.log(res)
                    this.notice_details = res.data
                }).catch(err => {
                    console.log(err)
                })
            },
            read(e) {
                let id = e.id
                API(ReadNotice,{
                    params: {
                        id
                    }
                }).then(res => {
                    console.log(res)
                    this.$message.success('请求成功')
                    this.getUserNotice()
                }).catch(err => {
                    console.log(err)
                })
            }
        },
    };
</script>

<style scoped>
    .title{
        font-size: 16px;
        font-weight: bold;
        padding-right: 10px;
    }
</style>
