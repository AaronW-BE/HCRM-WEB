<template>
    <div>
        <a-button type="primary" @click="return_visit_model = true" size="small" style="margin-bottom: 15px">添加回访</a-button>
        <a-modal title="添加回访" v-model="return_visit_model" okText="确认" cancelText="取消" @ok="addReturnVisit">
            <a-form :form="return_visit_info">
                <a-form-item label="下次回访时间">
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
    import {AddReturnVisit, DeleteVisits, ModifyVisit} from "../api/template";
    import {toTime} from "../utils/timeConversion";
    import moment from 'moment';
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            width: 50
        },
        {
            title: '回访时间',
            dataIndex: 'createAt',
            key: 'createAt',
            width: 200,
        },
        {
            title: '下次回访时间',
            dataIndex: 'returnTime',
            key: 'returnTime',
            sorter: true,
            width: 200,
        },
        {
            title: '回访内容',
            dataIndex: 'content',
            key: 'content',
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
        inject: [
            'refreshCustomer'
        ],
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
                                this.$message.success(res.msg)
                                this.return_visit_model = false
                                this.refreshCustomer();

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

                                this.refreshCustomer();
                            }).catch(err => {
                                console.log(err)
                            })
                        }
                    }
                });
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
                        cid,
                        id
                    }
                }).then( () => {
                    // console.log(res);
                    this.$message.info('删除成功');

                    this.refreshCustomer();
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
