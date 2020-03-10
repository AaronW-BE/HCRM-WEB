<template>
    <div :id="id" style="height: 100%"></div>
</template>

<script>
    import {TinyArea} from "@antv/g2plot";

    export default {
        name: "AreaChart",
        props: {
            id: {},
            data: {},
            title: {},
            xField: {},
            yField: {}
        },
        mounted() {
            this.drawChart();
        },
        watch: {
            data: function () {
                this.drawChart();
            }
        },
        methods: {
            drawChart() {
                this.chart && this.chart.destroy();
                this.chart = new TinyArea(this.id, {
                    smooth: true,
                    forceFit: true,
                    height: 50,
                    data: this.data,
                    title: {
                        text: this.title,
                        visible: !!this.title,
                    },
                    xField: this.xField,
                    yField: this.yField,
                });

                this.chart.render();
            }
        }
    }
</script>

<style scoped>

</style>