<template>
    <div>
        <input type="file" @change="fileChange"/>
    </div>
</template>

<script>

    import {API} from "../../api";
    import {ImportOrderByExcel} from "../../api/template";

    export default {
        name: "FileUploadTest",
        data() {
            return {
            };
        },
        methods: {
            fileChange(e) {
                let file = e.target.files[0];
                API(ImportOrderByExcel, {
                    name: 'file',
                    file: file
                }).then(res => {
                    console.log(res);
                });
            },
        }
    }
</script>

<style scoped>

</style>
