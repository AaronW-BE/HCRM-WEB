<template>
    <div>
        <input type="file" @change="fileChange"/>
    </div>
</template>

<script>

    import {API} from "../../api";
    import {TestFileUpload} from "../../api/template";

    export default {
        name: "FileUploadTest",
        methods: {
            fileChange(e) {
                let file = e.target.files[0];
                API(TestFileUpload, {
                    name: 'file',
                    file: file
                }).then(res => {
                    console.log(res);
                });
            }
        }
    }
</script>

<style scoped>

</style>