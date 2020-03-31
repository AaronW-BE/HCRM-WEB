<!--
创建或更新产品
-->
<template>
    <div>
        <a-form :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }"
                @submit="handleSubmit"
        >
            <a-form-item
                label="产品名称"
            >
                <a-input
                        v-decorator="['name', {
                            initialValue: this.product && this.product.name,
                            rules: [{ required: true, message: '请输入产品名称' }] }]"
                />
            </a-form-item>
            <a-form-item
                label="产品编码"
            >
                <a-input
                        v-decorator="['code', {
                            initialValue: this.product && this.product.code,
                            rules: [{ required: true, min: 6, message: '请输入有效产品编码' }] }]"
                />
            </a-form-item>
            <a-form-item
                    label="单价"
            >
                <a-input
                        v-decorator="['price', {
                            initialValue: 0,
                            rules: [{ validator: checkPrice }]}]"
                />
            </a-form-item>
            <a-form-item
                label="产品备注信息"
            >
                <a-textarea v-decorator="['remark', {
                    initialValue: this.product && this.product.remark,
                }]" />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit">保存</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
    import {API} from "../api";
    import {CreateProduct, UpdateProduct} from "../api/template";
    import {message} from 'ant-design-vue';

    export default {
        name: "CreateOrUpdateProduct",
        props: {
            product: {}
        },
        data() {
            return {
                form: this.$form.createForm(this)
            };
        },
        methods: {
            checkPrice(rule, value, callback) {
                console.log(value);
                if (value >= 0) {
                    callback();
                    return;
                }
                callback('请输入正确的价格');
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    console.log(err);
                    if (!err) {
                        this.doSubmit(values);
                    }
                });
            },
            doSubmit(values) {
                let options = {
                    data: values
                };
                let api;
                if (this.product && this.product.id) { // 更新
                    api = UpdateProduct;
                    options.params = {
                        id: this.product.id
                    }
                } else {  // 新建
                    api = CreateProduct;
                }
                API(api, options).then(() => {
                    this.$emit('success');
                    message.success("操作成功");
                }).catch(e => {
                    this.$emit('fail', e);
                });
            }
        }
    }
</script>

<style scoped>

</style>