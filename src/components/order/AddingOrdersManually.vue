<template>
    <a-card>
            <a-form layout="inline" :form = 'order_info' @submit="handleCreateOrder">
                <a-row>
                    <a-col :lg="8" :md="12" :xs="24">
                        <a-form-item
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                label="下单人姓名"
                                style="width: 100%;margin: 0 auto"
                        >
                            <a-input
                                    v-decorator="['name', { rules: [{ required: true, message: '请输入下单人姓名' }] }]"
                                    placeholder="name"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :lg="8" :md="12" :xs="24">
                        <a-form-item
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                label="下单人电话"
                                style="width: 100%;margin: 0 auto"
                        >
                            <a-input
                                    v-decorator="['phone', { rules: [{ required: true, message: '请输入正确的下单人电话',len: 11}] }]"
                                    placeholder="phone" />
                        </a-form-item>
                    </a-col>
                    <a-col :lg="8" :md="12" :xs="24">
                        <a-form-item
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                label="下单时间"
                                style="width: 100%;"
                        >
                            <a-date-picker
                                    showTime
                                    v-decorator="['orderDate',  { rules: [{ required: true, message: '请选择下单时间'}] }]"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col :lg="8" :md="12" :xs="24">
                        <a-form-item
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                label="收获地址"
                                style="width: 100%"
                        >
                            <a-cascader
                                    :options="address"
                                    changeOnSelect
                                    v-decorator="['address_item']"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :lg="8" :md="12" :xs="24">
                        <a-form-item
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                label="详细地址"
                                style="width: 100%;"
                        >
                            <a-input
                                    v-decorator="['address']"
                                    placeholder="请输入详细地址"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :lg="8" :md="12" :xs="24">
                        <a-form-item
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                label="金额"
                                style="width: 100%"
                        >
                            <a-input
                                    v-decorator="['amount']"
                                    type="number"
                                    placeholder="请输入订单金额"  />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col :lg="8" :md="12" :xs="24">
                        <a-form-item
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                label="第三方单号"
                                style="width: 100%;"
                        >
                            <a-input
                                    v-decorator="['tradeNo']"
                                    placeholder="请输入第三方单号"/>
                        </a-form-item>
                    </a-col>
                    <a-col :lg="8" :md="12" :xs="24">
                        <a-form-item
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                label="快递公司"
                                style="width: 100%;"
                        >
                            <a-input
                                    v-decorator="['expressCorp']"
                                    placeholder="请输入快递公司"/>
                        </a-form-item>
                    </a-col>
                    <a-col :lg="8" :md="12" :xs="24">
                        <a-form-item
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                label="备注"
                                style="width: 100%;"
                        >
                            <a-input
                                    v-decorator="['remark']"
                                    placeholder="请输入订单备注"/>
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col :lg="8" :md="12" :xs="24">
                        <a-form-item
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                label="运单"
                                style="width: 100%;"
                        >
                            <a-input
                                    v-decorator="['expressNo']"
                                    placeholder="请输入运单"/>
                        </a-form-item>
                    </a-col>
                    <a-col :lg="8" :md="12" :xs="24">
                        <a-form-item
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                label="来源"
                                style="width: 100%;"
                        >
                            <a-input
                                    v-decorator="['original']"
                                    placeholder="请输入订单来源"/>
                        </a-form-item>
                    </a-col>
                </a-row>

                <div class="handle-form-btn">
                    <a-button type="primary" html-type="submit">提交</a-button>
                    <a-button @click="reset">重置</a-button>
                </div>
            </a-form>
        </a-card>
</template>

<script>
    import {address} from "../../assets/js/cities";
    import {toTime} from "../../utils/timeConversion";
    import {API} from "../../api";
    import {ChangeOrder, CreateOrder, OrderDetail} from "../../api/template";
    import moment from "moment";
    export default {
        name: "AddingOrdersManually",
        props:['id'],
        data() {
            return{
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 10 },
                    lg: { span: 6 }
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 14 },
                    lg: { span: 18 }
                },
                order_info: this.$form.createForm(this),
                grade_item: null,
            }
        },
        created() {
            this.address = address
            if(this.id){
                this.getOrderDetail(this.id)
            }
        },
        methods: {
            getOrderDetail(id) {
                API(OrderDetail, {
                    params: {
                        id,
                    }
                }).then(res => {
                    // console.log(res);
                    let address_item = res.data.orderAddress.split(',') || '';
                    let address_item2 = res.data.orderAddress.substring(res.data.orderAddress.lastIndexOf(',')+1) || ''
                    let data = {
                        name: res.data.orderName,
                        phone: res.data.orderPhone,
                        orderDate: moment(res.data.orderTime, 'YYYY-MM-DD HH:mm:ss'),
                        amount:res.data.orderAmount,
                        tradeNo: res.data.orderNo,
                        expressCorp: res.data.orderExpressCorp,
                        remark: res.data.orderRemark,
                        expressNo: res.data.orderExpressNo,
                        original: res.data.original,
                        address_item:address_item,
                        address: address_item2
                    }
                    this.$nextTick(() => {
                        this.order_info.setFieldsValue(data)
                    })
                }).catch(err => {
                    console.log(err);
                })
            },
            handleCreateOrder(e) {
                e.preventDefault();
                this.order_info.validateFields((err,values) => {
                    if(!err) {
                        if( values.address_item && values.address) {
                            if(values.address_item.indexOf(values.address) === -1){
                                values.address_item.push(values.address)
                            }
                        }
                        let data = {
                            ...values,
                            orderDate: values.orderDate && toTime(values.orderDate._d),
                            address: (values.address_item && values.address_item.join(',')) || (values.address || '')
                        };
                        console.log(data)
                        if(this.id) {
                            API(ChangeOrder,{
                                params:{
                                    id:this.id
                                },
                                data,
                            }).then(res => {
                                console.log(res);
                                this.$message.success(res.msg);
                                this.$router.push({
                                    name: 'orderList'
                                })
                            }).catch(err => {
                                console.log(err)
                            })
                        }else{
                            API(CreateOrder,{
                                data,
                            }).then(res => {
                                // console.log(res)
                                this.$message.success(res.msg);
                                this.$router.push({
                                    name: 'orderList'
                                })
                            }).catch(err => {
                                console.log(err)
                            })
                        }

                    }
                })
            },
            reset() {
                this.order_info.resetFields()
            }
        }
    }
</script>

<style scoped>
    .handle-form-btn{
        width: 10%;
        margin: 40px auto 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
