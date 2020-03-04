<template>
    <a-card>
        <a-card :hoverable="true" style="width: 300px" size="small">
            <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    slot="cover"
                    style="height: 120px"
            />
            <a-card-meta title="导入数据"
                         description="This is the description">
            </a-card-meta>
            <template class="ant-card-actions" slot="actions">
                <a-icon type="close-circle" />
                <a-icon type="edit" />
            </template>
        </a-card>
        <a-button @click="tag_model = true">创建标签</a-button>
        <a-modal
                title="添加tag"
                :visible="tag_model"
                @ok="handleTagModel"
                @cancel="tag_model = false"
        >
            <a-form :form="tag_info">
                <a-form-item label="标签名">
                    <a-input
                            v-decorator="['name', { rules: [{ required: true, message: '请输入标签名' }] }]"
                    />
                </a-form-item>
                <a-form-item label="颜色">
                    <a-input
                            placeholder="输入64位颜色值 如#f50"
                            v-decorator="['type', { rules: [{ required: true, message: '请输入64位颜色值，如#f50' }] }]"
                    />
                </a-form-item>
            </a-form>
        </a-modal>
    </a-card>
</template>

<script>
    import {API} from "../../api";
    import {CreateTag} from "../../api/template";

    export default {
        name: "AppMain",
        data() {
            return {
                tag_model: false,
                tag_info: this.$form.createForm(this)
            }
        },
        methods: {
            handleTagModel() {
                this.tag_info.validateFields((err,values) => {
                    if(!err) {
                        let data = values
                        API(CreateTag,{
                            data,
                        }).then(res => {
                            console.log(res)
                            this.$message.success(res.msg)
                        }).catch(err => {
                            console.log(err)
                        }).finally(() => {
                            this.tag_model = false
                        })
                    }
                })
            }
        },
        watch: {
            tag_model(val) {
                if(!val){
                    this.tag_info.resetFields()
                }
            }
        }
    }
</script>

<style scoped>

</style>
