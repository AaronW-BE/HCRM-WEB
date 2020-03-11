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
                v-model="notice_details_model"
                @ok="notice_details_model = false"
        >
            <h2>{{notice_details && notice_details.title}}</h2>
            <p>{{notice_details && toTime(notice_details.createAt)}}</p>
            <p>{{notice_details && notice_details.content}}</p>
            <span slot="footer">
                <a-button type="primary" @click="notice_details_model = false">确定</a-button>
            </span>
        </a-modal>
    </a-card>
</template>

<script>
    import {API} from "../../../api";
    import {NoticeDetails, ReadNotice, UserNotice} from "../../../api/template";
    import {toTime} from "../../../utils/timeConversion";
    const columns = [
        {
            title: '状态',
            dataIndex: '',
            scopedSlots: { customRender: 'read'},
            width:  80
        },
        {
            title: '通知标题',
            scopedSlots: { customRender: 'notice'}
        },
        {
            title: '通知时间',
            dataIndex: 'createAt',
            width: 300
        },
        {
            title: '操作',
            dataIndex: '',
            width: 300,
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
            updateNavbar() {
                this.$root.$refs['navBar'].init();
            },
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
                    this.getUserNotice()

                    this.updateNavbar();
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
