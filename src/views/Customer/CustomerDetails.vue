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
                    {{detail.remark || '无'}}
                </Item>
                <Item term="性别">
                    <a-icon type="man" v-if="detail.gender===1" style="color: #1890ff" />
                    <a-icon type="woman" v-if="detail.gender===2" style="color: deeppink" />
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
                    <a-tag v-for="tag in detail.tags" :key="tag.name" :color="tag.type">{{tag.name}}</a-tag>
                    <span @click="addTag"><a-icon type="plus-circle" :style="{color: '#58A942' }"/></span>
                </Item>
            </data-detail-list>
        </a-card>
        <a-card title="订单信息">
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
    import {CustomerDetail} from "../../api/template";
    import {toTime} from "../../utils/timeConversion";

    const Item = DataDetailList.Item;

    export default {
        name: "CustomerDetail",
        components: {DataDetailList, ReturnVisit, Item},
        props: {
            id: {
                required: true
            }
        },
        data() {
            return{
                detail: {},
                return_visit_records:[]
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
            addTag() {

            }
        },
        watch: {
        }
    }
</script>

<style scoped>

</style>
