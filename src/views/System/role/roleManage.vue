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
                            :pagination="false"
                            :columns="columns" :dataSource="roleList" size="small" :rowKey="key => key.id">
                        <template slot-scope="scope" slot="action">
                            <a-popconfirm
                                    title="确定要删除该角色吗?"
                                    @confirm="handleRemoveRole(scope)"
                                    okText="确定"
                            >
                                <a-button type="danger" size="small">删除</a-button>
                            </a-popconfirm>
                            <a-button type="primary" size="small" style="margin-left: 10px" @click="modifyRole(scope)">修改</a-button>
                        </template>
                    </a-table>
                    <a-button type="primary" size="small" @click="showCreateRole = true" :disabled="showCreateRole">新建角色</a-button>
                    <div v-if="showCreateRole">
                        <a-card>
                            <a-form :form="createRoleForm" @submit="handleSaveRole">
                                <a-form-item label="角色名称" :label-col="{span: 4}"  :wrapper-col="{ span: 8 }" :required="true">
                                    <a-input
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
                            <a-tag style="margin: 5px" v-for="p in roleList.find(item => item.id === selectedRow.id).permissions" color="#6c6" :key="p.id" @click="handlePermission('remove',selectedRow.id,p.id)">{{p.name}} - {{p.code}}</a-tag>
                        </template>
                    </a-card>

                    <a-card title="所有权限">
                        <a-tag style="margin: 5px" v-for="p in permissions" :key="p.id" @click="handlePermission('',selectedRow && selectedRow.id,p.id)">{{p.name}} - {{p.code}}</a-tag>
                    </a-card>
                </a-col>
            </a-row>

        </a-card>


    </div>
</template>

<script>
    import {API} from "../../../api";
    import {
        AddPermission,
        AllPermission,
        CreateRole, ModifyRole,
        RemovePermission,
        RemoveRole,
        RoleList
    } from "../../../api/template";

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
                modify_role_id: null
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
                    // console.log(res);
                    this.roleList = res.data;
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
                            if(this.modify_role_id||this.modify_role_id===0){
                                API(ModifyRole,{
                                    params: {
                                        id: this.modify_role_id
                                    },
                                    data:values
                                }).then(res => {
                                    // console.log(res)
                                    this.$message.success(res.msg)
                                    this.modify_role_id = null
                                    this.showCreateRole = false;
                                    this.queryRoleList();
                                }).catch(err => {
                                    console.log(err)
                                })
                            }else{
                                API(CreateRole, {
                                    data: values
                                }).then(res => {
                                    message.success(res.msg);
                                    this.showCreateRole = false;
                                    this.queryRoleList();
                                });
                            }
                        }
                    });
            },
            handleRemoveRole(e) {
                // console.log(e)
                API(RemoveRole,{
                    params: {
                        id:e.id
                    }
                }).then(res => {
                    console.log(res)
                    this.$message.info('删除成功')
                    this.queryRoleList();
                }).catch(err => {
                    console.log(err)
                })
            },
            handlePermission(action='',id='',permissionId=''){
                if(id && permissionId) {
                    let PATH = action === 'remove'?RemovePermission:AddPermission;
                    API(PATH,{
                        params: {
                            id,
                        },
                        data:{
                            permissionId
                        }
                    }).then(res => {
                        console.log(res)
                        this.queryRoleList();
                        this.$message.info('请求成功')
                    }).catch(err => {
                        console.log(err)
                    })
                }else{
                    console.log('id不存在')
                }
            },
            modifyRole(e) {
                this.modify_role_id = e.id;
                this.showCreateRole = true;
                this.$nextTick(() => {
                    this.createRoleForm.setFieldsValue({
                        name: e.name
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>
