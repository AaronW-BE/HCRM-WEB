<template>
    <div>
        <div class="tag-list">
            <a-tag v-for="tag in tags" :key="tag.id" :color="tag.type" closable @close="log(tag.id)">{{tag.name}}</a-tag>
        </div>

        <a-button @click="showCreateTagDialog = true">新建标签</a-button>

        <create-tag-dialog :show.sync="showCreateTagDialog" @success="onTagCreated" />
    </div>
</template>

<script>
    import {API} from "../../api";
    import {DeleteTag, QueryTag} from "../../api/template";
    import CreateTagDialog from "../../components/CreateTagDialog";

    export default {
        name: "TagManage",
        components: {CreateTagDialog},

        data() {
            return {
                tags: [],
                showCreateTagDialog: false
            }
        },
        mounted() {
            this.queryTags();
        },
        methods: {
            queryTags() {
                API(QueryTag).then(res => {
                    this.tags = res.data;
                });
            },
            onTagCreated() {
                this.queryTags();
            },
            log(id){
                API(DeleteTag, {
                    params: {
                        id,
                    }
                }).then(() => {
                    // console.log(res)
                    this.$message.info('删除成功')
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
.tag-list {
}
    .tag-list>* {
        margin: .5rem;

    }
</style>
