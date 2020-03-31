<template>
    <div>
        <a-card>
            <div class="box-container">
                <a-button type="primary" @click="handleCreateProduct">创建产品</a-button>
            </div>
            <a-table :dataSource="list" :pagination="pagination"
                     :rowKey="record => record.id"
                     :columns="columns"
                     size="middle"
            >
                <span slot="createAt" slot-scope="createAt">
                    {{ new Date(createAt).toLocaleString() }}
                </span>
                <span slot="action" slot-scope="product">
                    <a-button type="primary" @click="handleEditProduct(product)">编辑</a-button>
                    <a-divider type="vertical" />
                    <a-popconfirm
                            cancelText="取消"
                            @confirm="handleRemoveProduct(product.id)"
                    >
                        <template slot="title">
                            <div>确定删除？</div>
                            <div>删除后与之关联的订单将失去产品信息</div>
                        </template>
                        <a-button type="danger">删除</a-button>
                    </a-popconfirm>
                </span>
            </a-table>
        </a-card>

        <a-modal
            title="编辑产品信息"
            v-model="showEditOrCreateProduct"
            :footer="null"
        >
            <create-or-update-product
                    :product="editedProduct"
                    @success="handleActionSuccess" @fail="handleActionFail" />
        </a-modal>
    </div>
</template>

<script>
    import {API} from "../../../api";
    import {DeleteProduct, ProductList} from "../../../api/template";
    import CreateOrUpdateProduct from "../../../components/CreateOrUpdateProduct";

    export default {
        name: "ProductManage",
        components: {CreateOrUpdateProduct},
        data() {
            return {
                showEditOrCreateProduct: false,
                editedProduct: null,
                columns: [
                    {
                        title: '产品编码',
                        dataIndex: 'code',
                        width: 150,
                    },
                    {
                        title: '产品名',
                        dataIndex: 'name',
                        width: 150,
                    },
                    {
                        title: '产品单价',
                        dataIndex: 'price',
                        width: 150,
                    },
                    {
                        title: '备注',
                        dataIndex: 'remark',
                        width: 150,
                    },
                    {
                        title: '创建时间',
                        dataIndex: 'createAt',
                        width: 150,
                        scopedSlots: { customRender: 'createAt' },
                    },
                    {
                        title: '操作',
                        width: 200,
                        scopedSlots: { customRender: 'action' },
                    }
                ],
                list: [],
                pagination: {
                    current: 1,
                    total: 0,
                    pageSize: 15,
                }
            }
        },
        mounted() {
            this.queryProductList();
        },
        methods: {
            handleCreateProduct() {
                this.editedProduct = null;
                this.showEditOrCreateProduct = true;
            },
            handleEditProduct(product) {
                this.editedProduct = product;
                this.showEditOrCreateProduct = true;
            },
            handleActionSuccess() {
                this.queryProductList();
                this.showEditOrCreateProduct = false;
                this.editedProduct = null;
            },
            handleActionFail() {
                console.log('操作失败');
            },
            handleRemoveProduct(id) {
                API(DeleteProduct, {
                    params: {
                        id
                    }
                }).then(() => {
                    this.queryProductList();
                });
            },
            queryProductList() {
                API(ProductList).then(res => {
                    this.list = res.data.results;
                    this.pagination.current = res.data.metadata.page;
                    this.pagination.total = res.data.metadata.count;
                    this.pagination.pageSize = res.data.metadata.size
                });
            }
        }
    }
</script>

<style scoped>

</style>