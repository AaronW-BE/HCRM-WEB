<template>
    <div class="detail-data-list">
        <div class="title">{{title}}</div>
        <a-row>
            <slot></slot>
        </a-row>
    </div>
</template>

<script>
    import ACol from 'ant-design-vue/es/grid/Col'

    const responsive = {
        1: {xs: 24},
        2: {xs: 24, sm: 12},
        3: {xs: 24, sm: 12, md: 8},
        4: {xs: 24, sm: 12, md: 6}
    };


    const item = {
        name: "Item",
        props: {
            term: {
                type: String,
                required: false
            }
        },
        methods: {
            renderTerm (h, term) {
                return term ? h(
                    'div',
                    {
                        attrs: {
                            class: 'term'
                        }
                    },
                    [term]
                ) : null
            },
            renderContent (h, content) {
                return h(
                    'div',
                    {
                        attrs: {
                            class: 'content'
                        }
                    },
                    [content]
                )
            }
        },
        render (h) {
            const term = this.renderTerm(h, this.$props.term);
            const content = this.renderContent(h, this.$slots.default);
            return h(
                ACol, {
                props: responsive[this.col],
                },
                [ term, content ])
        },
        inject: {
            col: {
                type: Number
            }
        }
    };
    export default {
        name: "DataDetailList",
        Item: item,
        methods: {},
        props: {
            col: {
                type: Number,
                required: false,
                default: 3
            },
            title: {
                type: String
            }
        },
        provide() {
            return {
                col: this.col > 4 ? 4 : this.col
            }
        },
        components: {}
    }
</script>

<style>
    .detail-data-list .title{
        font-size: 16px;
        color: rgba(0,0,0,.85);
        font-weight: bolder;
        margin-bottom: 16px;
    }
    .detail-data-list .term {
        line-height: 20px;
        padding-bottom: 16px;
        margin-right: 8px;
        color: rgba(0,0,0,.85);
        white-space: nowrap;
        display: table-cell;
    }
    .detail-data-list  .term::after {
        content: ':';
        margin: 0 8px 0 2px;
        position: relative;
        top: -0.5px;
    }
    .detail-data-list  .content{
        line-height: 22px;
        width: 100%;
        padding-bottom: 16px;
        color: rgba(0,0,0,.65);
        display: table-cell;
    }
</style>