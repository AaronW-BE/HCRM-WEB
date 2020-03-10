<template>
    <div>
        <a-card style="width:50%;margin: 0 auto"   v-if="showUpload">
            <a-upload-dragger
                    :customRequest="request"
                    :showUploadList	="false"
            >
                <p class="ant-upload-drag-icon">
                    <a-icon type="inbox"/>
                </p>
                <p class="ant-upload-hint">
                    单击或将文件拖到该区域以上传
                </p>
            </a-upload-dragger>
        </a-card>
        <div v-else class="loading-wrap">
            <div class="loading-icon">
                <a-icon type="info-circle" style="font-size: 50px;color: #5ed4a5"/>
            </div>
            <div class="loading-text">
                数据处理中,请稍后查看结果...
            </div>
            <div>
                <a-button style="margin-right:10px" @click="showUpload = true">继续上传</a-button>
                <a-button type="primary" @click="$router.push({name:'customerList'})">返回列表</a-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {API} from "../../api";
    import {ImportCustomerByExcel} from "../../api/template";

    export default {
        name: "ImportCustomers",
        data() {
            return{
                showUpload: true
            }
        },
        methods:{
            request(e){
                let file = e.file;
                API(ImportCustomerByExcel, {
                    name: 'file',
                    file: file
                }).then(res => {
                    console.log(res);
                    // message.success(res.msg)
                    this.showUpload = false
                });
            }
        }
    }
</script>

<style scoped>
    .loading-wrap{
        text-align: center;
    }
    .loading-icon{
        padding-bottom: 20px;
    }
    .loading-text{
        font-size: 15px;
        padding-bottom: 20px;
    }
</style>
