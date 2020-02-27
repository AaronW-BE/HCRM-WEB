<template>
    <div>
        <a-card>
            <a-form layout="inline" :form = 'form' @submit="handleSubmit">
                <a-divider><div style="color:#001529; font-weight: bold">客户信息</div></a-divider>
                <a-row>
                    <a-col :span="8">
                        <a-form-item
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                label="客户姓名"
                                style="width: 100%;margin: 0 auto"
                        >
                            <a-input
                                    v-decorator="['name', { rules: [{ required: true, message: '请输入客户姓名' }] }]"
                                    placeholder="请输入客户姓名"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                label="客户电话"
                                style="width: 100%;margin: 0 auto"
                        >
                            <a-input
                                    v-decorator="['phone', { rules: [{ required: true, message: '请输入正确的客户电话',max: 11}] }]"
                                    placeholder="请输入客户的电话" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                label="昵称"
                                style="width: 100%;margin: 0 auto"
                        >
                            <a-input
                                    v-decorator="['nickname']"
                                    placeholder="请输入客户昵称" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col :span="8">
                        <a-form-item
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                label="微信"
                                style="width: 100%;"
                        >
                            <a-input
                                    v-decorator="['wechat']"
                                    placeholder="请输入客户微信" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                style="width: 100%"
                                label="客户性别"
                        >
                            <a-radio-group
                                    v-decorator="['gender']"
                            >
                                <a-radio :value="1" >
                                    男
                                </a-radio>
                                <a-radio :value="2" >
                                    女
                                </a-radio>
                            </a-radio-group>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                label="客户来源"
                                style="width: 100%;"
                        >
                            <a-input
                                    v-decorator="['original']"
                                    placeholder="请输入客户来源" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col :span="8">
                        <a-form-item
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                label="所在地"
                                style="width: 100%"
                        >
                            <a-cascader
                                    :options="address"
                                    changeOnSelect
                                    v-decorator="['address_item']"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                label="详细地址"
                                style="width: 100%;"
                        >
                            <a-input
                                    v-decorator="['address']"
                                    placeholder="请输入客户详细地址"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                label="下次跟进时间"
                                style="width: 100%;"
                        >
                            <a-date-picker
                                    v-decorator="['nextFollowAt']"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col :span="8">
                        <a-form-item
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                label="备注"
                                style="width: 100%"
                        >
                            <a-textarea
                                    v-decorator="['remark']"
                                    placeholder="请输入客户备注" :rows="4" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-divider><div style="color:#001529; font-weight: bold">宝贝信息</div></a-divider>

                <a-row>
                    <a-col :span="8">
                        <a-form-item
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                label="宝贝姓名"
                                style="width: 100%;"
                        >
                            <a-input
                                    v-decorator="['childName']"
                                    placeholder="请输入宝贝姓名"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                                label="宝贝年级"
                                style="width: 100%"
                        >
                            <a-select  @change="handleChange">
                                <a-select-option
                                        v-for="item in grade" :key="item.label"
                                >
                                    {{item.label}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item
                            :label-col="labelCol"
                            :wrapper-col="wrapperCol"
                            label="宝贝生日"
                            style="width: 100%;"
                    >
                        <a-date-picker
                                v-decorator="['childBirth']"
                        />
                    </a-form-item>
                    </a-col>
                </a-row>

                <div class="handle-form-btn">
                    <a-button type="primary" html-type="submit">提交</a-button>
                    <a-button @click="reset">重置</a-button>
                </div>
            </a-form>
        </a-card>
    </div>
</template>

<script>
    import {grade} from "../../utils/grade";
    import {address} from "../../assets/js/cities";
    import {toTime} from "../../utils/timeConversion";
    import {AddCustomer} from "../../api/template";
    import {API} from "../../api";
    // import message from 'ant-design-vue/lib/message '

    export default {
        name: "CustomerInformation",
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
                grade:[],
                form: this.$form.createForm(this),
                grade_item: null,
                address: null
            }
        },
        created() {
            this.grade = grade;
            this.address = address
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        let data = {
                            ...values,
                            province:values.address_item ? values.address_item[0] : '',
                            city:values.address_item ? values.address_item[1] : '',
                            address: values.address_item && values.address_item[2]? values.address_item[2] + values.address : values.address || '',
                            childGrade: this.grade_item || '',
                            nextFollowAt: values.nextFollowAt && values.nextFollowAt._d ? toTime(values.nextFollowAt._d) : '',
                            childBirth:values.childBirth && values.childBirth._d ? toTime(values.childBirth._d) : ''
                        };
                        API(AddCustomer,{
                            data,
                        }).then(res => {
                            this.$message.success(res.msg)
                            this.$router.push({
                                name: 'customerList'
                            })
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                });
            },
            handleChange(value) {
                this.grade_item = value;
            },
            reset() {
                this.form.resetFields();
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
