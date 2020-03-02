<template>
    <div>
        <a-button type="primary" @click="return_visit_model = true" style="margin-bottom: 24px">添加回访</a-button>
        <a-modal title="添加回访" v-model="return_visit_model" okText="确认" cancelText="取消" @ok="addReturnVisit">
            <a-form :form="return_visit_info">
                <a-form-item label="回访时间">
                    <a-date-picker
                            showTime
                            v-decorator="['time', { rules: [{ required: true, message: '请选择回访时间' }] }]"
                    />
                </a-form-item>
                <a-form-item label="回访内容">
                    <a-textarea
                            placeholder="回访内容..."
                            v-decorator="['content', { rules: [{ required: true, message: '请输入回访内容' }] }]"
                    />
                </a-form-item>
            </a-form>
        </a-modal>
        <a-table size="small" :columns="columns" :dataSource="return_visit_records" :pagination="false" :rowKey="record => record.id">
             <span slot="action" slot-scope="visit">
                <a-button type="primary" @click="editVisit(visit)" style="margin-right: 10px">编辑</a-button>
                <a-button type="danger" @click="deleteVisit(visit)">删除</a-button>
            </span>
        </a-table>
    </div>
</template>

<script>
    import {API} from "../api";
    import {AddReturnVisit, CustomerAllVisits, DeleteVisits, ModifyVisit} from "../api/template";
    import {toTime} from "../utils/timeConversion";
    import moment from 'moment';
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '回访时间',
            dataIndex: 'returnTime',
            key: 'returnTime',
            sorter: true
        },
        {
            title: '回访内容',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: '创建时间',
            dataIndex: 'createAt',
            key: 'createAt',
        },
        {
            title: '操作',
            width: 250,
            scopedSlots: {customRender: 'action'}
        }
    ];
    export default {
        name: "ReturnVisit",
        props: {
            customer_id:{
                required: true
            },
            return_visit_records:Array
        },
        data() {
            return{
                return_visit_model: false,
                content: '',
                return_visit_info: this.$form.createForm(this),
                // return_visit_records: [ ],
                columns,
                visit_id: null
            }
        },
        created() {
        },
        methods:{
            moment,
            addReturnVisit() {
                this.return_visit_info.validateFields((err, values) => {
                    if (!err) {
                        let cid =  this.customer_id;
                        let id = this.visit_id;
                        let time = toTime(values.time._d);
                        let data = {
                            ...values,
                            time,
                        };
                        if(this.visit_id || this.visit_id===0) {
                            API(ModifyVisit,{
                                params: {
                                    cid,
                                    id,
                                },
                                data,
                            }).then(res => {
                                // console.log(res)
                                this.$message.success(res.msg)
                                this.return_visit_model = false
                            }).catch(err => {
                                console.log(err)
                            })
                        }else{
                            API(AddReturnVisit,{
                                params: {
                                    id:cid,
                                },
                                data,
                            }).then( (res) => {
                                this.$message.success(res.msg)
                                this.return_visit_model = false
                            }).catch(err => {
                                console.log(err)
                            })
                        }
                    }
                });
            },
            customerAllVisits() {
                let cid =  this.customer_id;
                API(CustomerAllVisits,{
                    params:{
                        cid,
                    }
                }).then(res => {
                    console.log(res)
                    res.data.results.map(item => {
                        item.returnTime = toTime( item.returnTime)
                        item.createAt = toTime( item.createAt)
                    })
                    this.return_visit_records = res.data.results;
                }).catch(err => {
                    console.log(err)
                })
            },
            editVisit(visit){
                this.return_visit_model = true;
                this.visit_id = visit.id;
                this.return_visit_info = this.$form.createForm(this, {
                    mapPropsToFields: () => {
                        return {
                            content: this.$form.createFormField({
                                value: visit.content
                            }),
                            time: this.$form.createFormField({
                                value: moment(visit.returnTime, 'YYYY-MM-DD HH:mm:ss')
                            })
                        }
                    }
                });
            },
            deleteVisit(visit) {
                console.log(visit)
                let id = visit.id
                let cid = this.customer_id
                API(DeleteVisits, {
                    params:{
                        id,
                       cid
                    }
                }).then( () => {
                    // console.log(res);
                    this.$message.info('删除成功')
                    this.customerAllVisits()
                }).catch(err => {
                    console.log(err)
                    this.$message.error('删除失败')
                })
            }
        },
        watch:{
            return_visit_model(val) {
                if(val){
                    return
                }
                this.return_visit_info.resetFields()
            }
        }
    }
</script>

<style scoped>
</style>
