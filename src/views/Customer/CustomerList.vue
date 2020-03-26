<template>
    <div>
        <a-card>
            <div class="form-container">
                <a-form layout="inline" :form="searchForm" @submit="handleSearch">
                    <a-row>
                        <a-col :md="6">
                            <a-form-item label="客户姓名">
                                <a-input
                                        v-decorator="['name', {
                                    initialValue: ''
                                }]"
                                        placeholder="请输入客户姓名" />
                            </a-form-item>
                        </a-col>
                        <a-col :md="6">
                            <a-form-item label="标签">
                                <a-select
                                        mode="multiple"
                                        placeholder="选择查询的标签"
                                        style="min-width: 200px; max-width: 250px"
                                        allowClear
                                        :maxTagCount="5"
                                        v-model="searchFields.tagIds"
                                >
                                    <a-select-option v-for="tag in tagList" :key="tag.id">{{tag.name}}</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :md="6">
                            <a-form-item label="客户昵称">
                                <a-input
                                        v-decorator="['nickname', {
                                    initialValue: ''
                                }]"
                                        placeholder="请输入客户昵称" />
                            </a-form-item>
                        </a-col>
                        <a-col :md="6">
                            <a-form-item label="宝贝姓名">
                                <a-input
                                        v-decorator="['childName', {
                                    initialValue: ''
                                }]"
                                        placeholder=宝贝姓名 />
                            </a-form-item>
                        </a-col>
                        <a-col :md="6">
                            <a-form-item label="手机号">
                                <a-input
                                        v-decorator="['phone', {
                                    initialValue: ''
                                }]"
                                        placeholder=手机号 />
                            </a-form-item>
                        </a-col>
                        <a-col :md="6">
                            <a-form-item label="性别">
                                <a-radio-group v-model="searchFields.gender" :options="[{label: '男', value: '1'}, {label: '女', value: '0'}, {label: '全部', value: ''}]" defaultValue="" />
                            </a-form-item>
                        </a-col>
                        <a-col :md="6">
                            <a-form-item label="服务人">
                                <a-radio-group v-model="searchFields.showSelfServe">
                                    <a-radio :value="true">仅自己服务</a-radio>
                                    <a-radio :value="false" checked>全部</a-radio>
                                </a-radio-group>
                            </a-form-item>
                        </a-col>
                        <a-col :md="8">
                            <a-form-item label="回访时间">
                                <a-range-picker v-model="nextReturnDate" showTime />
                            </a-form-item>
                        </a-col>
                        <a-col :md="6">
                            <a-form-item>
                                <a-button type="primary" html-type="submit" style="margin-right: 10px">查询</a-button>
                                <a-button @click="resetSearch" >重置</a-button>
                            </a-form-item>
                            <a-form-item>
                                <a-divider type="vertical" />
                            </a-form-item>
                            <a-form-item>
                                <a-button type="primary" @click="addCustomer">新建</a-button>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
            <a-table :columns="columns" :dataSource="list"
                     :rowKey="record => record.id"
                     :loading="loading"
                     :pagination="pagination"
                     @change="onTableChange"
            >
                <span slot="tags" slot-scope="tags">
                    <a-tag v-for="tag in tags.slice(0,4)" :key="tag.id" :color="tag.type">{{tag.name}}</a-tag>
                </span>
                <span slot="adviser" slot-scope="adviser">
                    <a-icon type="check-circle" v-if="adviser" theme="filled" style="color: #42b983" />
                </span>
                <span slot="gender" slot-scope="gender">
                    <a-icon type="man" v-if="gender===1" style="color: #1890ff" />
                    <a-icon type="woman" v-else-if="gender===0" style="color: deeppink" />
                    <template v-else>
                        未填写
                    </template>
                </span>
                <span slot="action" slot-scope="scope">
                    <a-button type="primary" size="small" @click="viewDetails(scope.id)">查看详情</a-button>
                    <a-button v-if="scope.adviser" type="dashed" size="small" @click="showTransferCustomer(scope)">转交客户</a-button>
                    <a-button v-else type="primary" size="small" style="margin-left: 5px" @click="handleTransferToSelf(scope)">领取此用户</a-button>
                </span>
            </a-table>
        </a-card>
        <user-search-dialog :show.sync="showUserSelect" @selected="handleTransferCustomer"/>
    </div>
</template>

<script>
    import {API} from "../../api";
    import {CustomerList, QueryTag, TransferCustomer, TransferCustomer2self,} from "../../api/template";
    import UserSearchDialog from "../../components/UserSearchDialog";
    import {Modal} from "ant-design-vue";

    import {message} from 'ant-design-vue'

    export default {
        name: "CustomerList",
        components: {UserSearchDialog},
        data() {
            const columns = [
                {
                    title: '客户姓名',
                    dataIndex: 'name',
                    sorter: true,
                    width: 120,
                },
                {
                    title: '昵称',
                    dataIndex: 'nickname',
                    sorter: true,
                    width: 120
                },
                {
                    title: '微信号',
                    dataIndex: 'wechat',
                    sorter: true,
                    width: 120,
                },
                {
                    title: '手机号',
                    dataIndex: 'phone',
                    width: 120,
                },
                {
                    title: '标签',
                    dataIndex: 'tags',
                    width: 200,
                    scopedSlots: {customRender: 'tags'}
                },
                {
                    title: '性别',
                    dataIndex: 'gender',
                    sorter: true,
                    width: 80,
                    scopedSlots: {customRender: 'gender'}
                },
                // {
                //     title: '组别',
                //     dataIndex: 'groupName',
                //     sorter: true,
                //     width: 100
                // },
                {
                    title: '省份',
                    dataIndex: 'province',
                    sorter: true,
                    width: 100
                },
                {
                    title: '城市',
                    dataIndex: 'city',
                    sorter: true,
                    width: 100
                },
                {
                    title: '来源',
                    dataIndex: 'original',
                    sorter: true,
                    width: 100
                },
                {
                    title: "服务状态",
                    dataIndex: 'adviser',
                    width: 80,
                    scopedSlots: { customRender: 'adviser' },
                },
                {
                    title: '操作',
                    width: 200,
                    scopedSlots: { customRender: 'action' },
                }
            ];
            return {
                searchForm: this.$form.createForm(this),
                searchFields: {
                    gender: '',
                    showSelfServe: false,
                    tagIds: []
                },
                tagList: [],
                nextReturnDate: [],
                columns,
                loading: false,
                list: [],
                pagination: {
                    pageSize: 15
                },
                showUserSelect: false,
                selectedCustomer: null
            };
        },
        mounted() {
            this.queryCustomer();
            this.queryTagList();
        },
        methods: {
            handleSearch(e) {
                e.preventDefault();
                this.searchForm.validateFields((err, values) => {
                    if (!err) {
                        this.queryCustomer(values);
                    }
                });
            },
            resetSearch() {
                this.searchForm.resetFields();
                this.queryCustomer();
            },
            queryCustomer(data = {}) {
                this.loading = true;
                const searchData = this.searchForm.getFieldsValue();
                data = {
                    ...searchData
                };

                let nextReturnRange = {};
                if (this.nextReturnDate.length === 2) {
                    nextReturnRange = {
                        nextDateStart: this.nextReturnDate[0].format("YYYY-MM-DD HH:mm:ss"),
                        nextDateEnd: this.nextReturnDate[1].format("YYYY-MM-DD HH:mm:ss")
                    };
                }

                let tagIds = this.searchFields.tagIds.join(',');

                API(CustomerList, {
                    data: {
                        size: this.pagination.pageSize,
                        page: this.pagination.current,
                        ...data,
                        ...nextReturnRange,
                        ...this.searchFields,
                        tagIds: tagIds,
                    }
                }).then(res => {
                    this.list = res.data.results;
                    this.pagination = {
                        current: res.data.metadata.page,
                        total: res.data.metadata.count,
                        pageSize: res.data.metadata.size,
                    };
                }).finally(() => {
                    this.loading = false;
                });
            },

            queryTagList() {
                API(QueryTag).then(res => {
                    this.tagList = res.data;
                });
            },
            onTableChange(pagination) {
                this.pagination = pagination;
                this.queryCustomer();
            },
            viewDetails(id){
                this.$router.push({
                    name: 'customerDetail',
                    params: {
                        id
                    }
                })
            },
            addCustomer() {
                this.$router.push({
                    name: 'customerInformation'
                })
            },
            showTransferCustomer(customer) {
                this.showUserSelect = true;
                this.selectedCustomer = customer;
            },
            handleTransferToSelf(customer) {
                API(TransferCustomer2self, {
                    params: {
                        id: customer.id
                    }
                }).then(() => {
                    message.success("领取成功");
                    this.queryCustomer();
                });
            },
            handleTransferCustomer(user) {
                console.log(user, this.selectedCustomer);
                Modal.confirm({
                    title: "转交确认",
                    content: `将客户【${this.selectedCustomer.name}】转交给 【${user.name}】`,
                    okText: '确定',
                    onOk:() => {
                        // 确定转交
                        console.log('转交中。。。。');
                        API(TransferCustomer, {
                            params: {
                                id: this.selectedCustomer.id
                            },
                            data: {
                                userId: user.id
                            }
                        }).then(res => {
                            console.log(res);
                            message.success("转交成功");
                            this.queryCustomer();
                        }).catch((e) => {
                            let msg = e.data.msg || '转交失败';
                            message.error(msg);
                        });
                    },
                    onCancel: () => {
                        this.selectedCustomer = null;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
