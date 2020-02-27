<template>
    <div>
        <a-modal :visible="show"
                 title="选择用户"
                 @ok="handleOk"
                 @cancel="handleCancel"
        >
            <a-form layout="inline" :form="searchForm" @submit="handleSearch">
<!--                <a-form-item label="用户名">-->
<!--                    <a-input-->
<!--                            size="small"-->
<!--                            v-decorator="['username', {-->
<!--                                    initialValue: ''-->
<!--                                }]"-->
<!--                            placeholder="请输入用户名" />-->
<!--                </a-form-item>-->
                <a-form-item label="姓名">
                    <a-input
                            size="small"
                            v-decorator="['name', {
                                    initialValue: ''
                                }]"
                            placeholder="请输入用户姓名" />
                </a-form-item>
                <a-form-item>
                    <a-button
                            size="small" type="primary" html-type="submit" style="margin-right: 10px">查询</a-button>
                </a-form-item>
            </a-form>
            <a-list :dataSource="list"
                :loading="loading"
                    size="small"
                    :pagination="pagination"
            >
                <a-list-item slot="renderItem" slot-scope="item" @click="selected = item"
                >
                    <span>
                        {{item.name}}
                        <a-icon v-if="selected === item" type="check-circle" theme="filled" style="font-size: 12px; color: #1890ff" />
                    </span>

                </a-list-item>
            </a-list>
            <template slot="footer">
                <a-button key="submit" type="primary" :disabled="!selected" @click="handleOk">
                    确定
                </a-button>
            </template>
        </a-modal>
    </div>
</template>

<script>
    import {API} from "../api";
    import {UserList} from "../api/template";

    export default {
        props: {
            show: {
                required: true,
                type: Boolean,
            }
        },
        name: "UserSearchDialog",
        data() {
            return {
                selected: null,
                loading: false,
                searchForm: this.$form.createForm(this),
                list: [],
                pagination: {
                    current: 1,
                    pageSize: 5,
                    onChange: page => {
                        this.pagination.current = page;
                        this.queryUserList();
                    },
                }
            }
        },
        mounted() {
        },
        methods: {
            handleOk() {
                this.$emit('selected', this.selected);
                this.$emit('update:show', false)
                this.selected = null
            },
            handleCancel() {
                this.selected = null;
                this.$emit('update:show', false)
            },
            handleSearch(e) {
                e.preventDefault();
                this.queryUserList();
            },
            queryUserList() {
                this.loading = true;

                let searchFormFields = this.searchForm.getFieldsValue();
                let data = {
                    ...searchFormFields,
                    size: this.pagination.pageSize,
                    page: this.pagination.current
                };
                API(UserList, {
                    data
                }).then(res => {
                    this.list = res.data.results;
                    this.pagination.current = res.data.metadata.page
                    this.pagination.total = res.data.metadata.count
                    this.pagination.pageSize = res.data.metadata.size
                }).finally(() => {
                    this.loading = false;
                });
            }
        }
    }
</script>

<style scoped>
</style>