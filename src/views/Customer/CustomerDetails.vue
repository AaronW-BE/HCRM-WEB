<template>
    <div>
        <a-card style="">
            <data-detail-list title="基本信息">
                <Item term="姓名">
                    {{detail.name}}
                </Item>
                <Item term="昵称">
                    {{detail.nickname}}
                </Item>
                <Item term="电话">
                    {{detail.phone}}
                </Item>
                <Item term="来源">
                    {{detail.original}}
                </Item>
                <Item term="微信">
                    {{detail.wechat}}
                </Item>
                <Item term="城市">
                    {{detail.province}}{{detail.city}}
                </Item>
                <Item term="具体地址">
                    {{detail.address}}
                </Item>
                <Item term="备注">
                    {{detail.remark }}
                </Item>
                <Item term="性别">
                    <a-icon type="man" v-if="detail.gender===1" style="color: #1890ff" />
                    <a-icon type="woman" v-else-if="detail.gender===0" style="color: deeppink" />
                    <template v-else>
                        未填写
                    </template>
                </Item>
                <Item term="宝贝">
                    {{detail.childName}}
                </Item>
                <Item term="宝贝性别">
                    <a-icon type="man" v-if="detail.childGender===1" style="color: #1890ff" />
                    <a-icon type="woman" v-else-if="detail.childGender===0" style="color: deeppink" />
                   <template v-else>
                       未填写
                   </template>
                </Item>
                <Item term="宝贝生日">
                    {{detail.childBirth || '未填写'}}
                </Item>
                <Item term="年级">
                    {{detail.childGrade || '未知'}}
                </Item>
            </data-detail-list>
            <data-detail-list title="附加信息">
                <item term="顾问">{{detail.adviserName}}</item>
                <Item term="标签">
                    <a-tag v-for="tag in detail.tags" :key="tag.name" :color="tag.type" closable @close="deleteCustomer(tag.id)">{{tag.name}}</a-tag>
                    <span @click="showTagsModel">
                        <a-icon type="plus-circle" />
                    </span>
                </Item>
                <Item term="下次回访">{{new Date(detail.nextFollowAt).toLocaleString()}}</Item>
            </data-detail-list>
            <a-modal title="添加标签" v-model="tagsModel" @ok="addTags">
                <a-radio-group v-model="customer_tag">
                    <a-radio v-for="item in tags" :key="item.id" :value="item.id">
                        <a-tag :color="item.type">{{item.name}}</a-tag>
                    </a-radio>
                </a-radio-group>
            </a-modal>
        </a-card>
        <a-card title="订单信息">
<!--            <a href="#" @click="$router.push({name: 'customerOrders', params: {id}})" slot="extra">更多</a>-->
            <customer-order-list :id="id"></customer-order-list>
        </a-card>
        <a-card title="客户回访">
            <ReturnVisit :customer_id="id" :return_visit_records = 'return_visit_records'></ReturnVisit>
        </a-card>
    </div>
</template>

<script>
    import ReturnVisit from "../../components/ReturnVisit";
    import DataDetailList from "../../components/tool/DataDetailList";
    import {API} from "../../api";
    import {CustomerAddTag, CustomerDeleteTag, CustomerDetail, DeleteOrder, QueryTag} from "../../api/template";
    import {toTime} from "../../utils/timeConversion";
    import CustomerOrderList from "./CustomerOrderList";

    const Item = DataDetailList.Item;

    export default {
        name: "CustomerDetail",
        components: {CustomerOrderList, DataDetailList, ReturnVisit, Item},
        props: {
            id: {
                required: true,
            }
        },
        data() {
            return{
                detail: {},
                return_visit_records:[],
                tag_model: false,
                tag_info: this.$form.createForm(this),
                tagsModel: false,
                customer_tag: null,
                tags: null,
                orders: [
                    {
                        title: '下单人姓名',
                        dataIndex: 'orderName',
                    },
                    {
                        title: '下单手机号',
                        dataIndex: 'orderPhone',
                    },
                    {
                        title: '订单号',
                        dataIndex: 'orderNo'
                    },
                    {
                        title: '金额',
                        dataIndex: 'orderAmount'
                    },
                    {
                        title: '下单时间',
                        dataIndex: 'orderTime',
                        customRender(scopedSlot) {
                            if (scopedSlot) {
                                return new Date(scopedSlot).toLocaleString();
                            }
                        }
                    },
                    {
                        title: '来源',
                        dataIndex: 'original',
                        // width: 120
                    },
                    {
                        title: '创建时间',
                        dataIndex: 'createAt',
                        customRender(scopedSlot) {
                            if (scopedSlot) {
                                return new Date(scopedSlot).toLocaleString();
                            }
                        }
                    },
                    {
                        title: '操作',
                        width: 200,
                        scopedSlots: { customRender: 'action' },
                    }
                ],
            }
        },
        created() {
        },
        mounted() {
            if(this.id){
                this.getCustomerDetail();
            }
        },
        provide: function () {
            return {
                refreshCustomer: this.getCustomerDetail
            }
        },
        methods:{
            getCustomerDetail() {
                API(CustomerDetail, {
                    params: {
                        id: this.id
                    }
                }).then(res => {
                    res.data.childBirth =  (res.data && res.data.childBirth) ? toTime(res.data.childBirth) : '';
                    this.detail = res.data;
                    if(res.data.returnVisits){
                        res.data.returnVisits.map( item => {
                            item.returnTime =  toTime( item.returnTime)
                            item.createAt =  toTime( item.createAt)
                        })
                    }
                    this.return_visit_records = res.data.returnVisits || ''
                });
            },
            handleTabsChange(val) {
                console.log(val)
            },
            addTags() {
                API(CustomerAddTag,{
                    params:{
                        cid: this.id
                    },
                    data: {
                        tagId:this.customer_tag
                    }
                }).then(res => {
                    // console.log(res)
                    this.$message.success(res.msg)
                    this.tagsModel = false
                    this.getCustomerDetail();
                }).catch(err => {
                    console.log(err)
                })
            },
            showTagsModel() {
                this.tagsModel = true;
                API(QueryTag).then(res => {
                    // console.log(res)
                    this.tags = res.data
                }).catch(err => {
                    console.log(err)
                })
            },
            deleteCustomer(e){
                let tagId = e
                API(CustomerDeleteTag,{
                    params: {
                        cid: this.id
                    },
                    data:{
                        tagId,
                    }
                }).then(res => {
                    console.log(res)
                    this.$message.info('删除成功')
                }).catch(err => {
                    console.log(err)
                })
            },
            deleteOrder(order) {
                let id = order
                API(DeleteOrder,{
                    params: {
                        id,
                    }
                }).then(res => {
                    console.log(res)
                    this.$message.info('删除成功')
                    this.queryOrders();
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        watch: {
        }
    }
</script>

<style scoped>

</style>
