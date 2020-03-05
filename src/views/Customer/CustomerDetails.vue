<template>
    <div>
        <a-card style="">
            <data-detail-list title="基本信息">
                <Item term="姓名">
                    {{detail.name}}
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
                    <a-icon type="woman" v-else style="color: deeppink" />
                </Item>
                <Item term="宝贝">
                    {{detail.childName}}
                </Item>
                <Item term="生日">
                    {{detail.childBirth}}
                </Item>
                <Item term="年级">
                    {{detail.childGrade}}
                </Item>
            </data-detail-list>
            <data-detail-list title="附加信息">
                <item term="顾问">{{detail.adviserName}}</item>
                <Item term="标签">
                    <a-tag v-for="tag in detail.tags" :key="tag.name" :color="tag.type" closable @close="deleteCustomer(tag)">{{tag.name}}</a-tag>
                    <span @click="showTagsModel">
                        <a-icon type="plus-circle" />
                    </span>
                </Item>
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
            <a href="#" @click="$router.push({name: 'customerOrders', params: {id}})" slot="extra">更多</a>
            258
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
    import {CustomerAddTag, CustomerDetail, QueryTag} from "../../api/template";
    import {toTime} from "../../utils/timeConversion";

    const Item = DataDetailList.Item;

    export default {
        name: "CustomerDetail",
        components: {DataDetailList, ReturnVisit, Item},
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
                tags: null
            }
        },
        created() {
        },
        mounted() {
            if(this.id){
                this.getCustomerDetail();
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
                console.log(e)
            }
        },
        watch: {
        }
    }
</script>

<style scoped>

</style>
