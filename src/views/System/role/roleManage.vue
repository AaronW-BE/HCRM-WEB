<template>
    <div>
        <a-card>
            <a-row type="flex" justify="space-around">
                <a-col :md="10">
                    <a-table
                            :row-selection="{
                                onSelect:  handleRowSelect,
                                type: 'radio'
                            }"
                            :columns="columns" :dataSource="roleList" size="small" :rowKey="key => key.id">
                        <template slot-scope="scope" slot="action">
                            <a-button type="danger" size="small" @click="handleRemoveRole(scope)">删除</a-button>
                        </template>
                    </a-table>
                    <a-button type="primary" size="small" @click="showCreateRole = true" :disabled="showCreateRole">新建角色</a-button>
                    <div v-if="showCreateRole">
                        <a-card>
                            <a-form :form="createRoleForm" @submit="handleSaveRole">
                                <a-form-item label="角色名" :label-col="{span: 2}"  :wrapper-col="{ span: 8 }" :required="true">
                                    <a-input
                                            size="small"
                                            v-decorator="['name', { rules: [{ required: true, message: '请输入角色名称', min: 2 }] }]"
                                            placeholder="请输入角色名称"
                                    />
                                </a-form-item>
                                <a-form-item :label-col="{span: 2}"  :wrapper-col="{ span: 8 }">
                                    <a-button type="primary" size="small" html-type="submit">保存</a-button>
                                    <a-button size="small" @click="showCreateRole = false">取消</a-button>
                                </a-form-item>
                            </a-form>
                        </a-card>
                    </div>
                </a-col>
                <a-col :md="12">
                    <a-card title="已拥有权限">
                        <template v-if="selectedRow">
                            <a-tag v-for="p in selectedRow.permissions" color="#6c6" :key="p.id">{{p.name}} - {{p.code}}</a-tag>
                        </template>
                    </a-card>

                    <a-card title="所有权限">
                        <a-tag v-for="p in permissions" :key="p.id">{{p.name}} - {{p.code}}</a-tag>
                    </a-card>
                </a-col>
            </a-row>

        </a-card>


    </div>
</template>

<script>
    import {API} from "../../../api";
    import {AllPermission, CreateRole, RoleList} from "../../../api/template";

    import {message} from 'ant-design-vue';

    export default {
        name: "roleManage",
        data() {
            return {
                columns: [
                    {
                        title: '角色名',
                        dataIndex: 'name',
                        key: 'name'
                    },
                    {
                        title: '操作',
                        scopedSlots: { customRender: 'action' },
                    }],
                roleList: [],
                permissions: [],
                showCreateRole: false,
                createRoleForm: this.$form.createForm(this),
                selectedRow: null,
            };
        },
        created() {
            this.queryRoleList();
            this.queryPermissionList();
        },
        methods: {
            handleRowSelect(record) {
                this.selectedRow = record;
            },
            queryRoleList() {
                API(RoleList).then(res => {
                    console.log(res);
                    this.roleList = res.data.results;
                });
            },
            queryPermissionList() {
                API(AllPermission).then(res => {
                    this.permissions = res.data.results;
                });
            },
            handleSaveRole(e) {
                e.preventDefault();

                this.createRoleForm.validateFields((err, values) => {
                    if (!err) {
                        API(CreateRole, {
                            data: values
                        }).then(res => {
                            message.success(res.msg);
                            this.showCreateRole = false;
                            this.queryRoleList();
                        });
                    }
                });


            },
            handleRemoveRole() {

            }
        }
    }
</script>

<style scoped>

</style>