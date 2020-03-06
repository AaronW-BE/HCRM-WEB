<template>
    <div :id="id" style="height: 100%"></div>
</template>

<script>
    import {Bar} from "@antv/g2plot";

    export default {
        name: "BarChart",
        props: {
            id: {},
            title: {},
            data: {},
            xField: {},
            yField: {},
            color: {}
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
                this.chart = new Bar(this.id, {
                    forceFit: true,
                    data: this.data,
                    title: {
                        text: this.title,
                        visible: true
                    },
                    color: this.color,
                    colorField: 'label',
                    xField: this.xField,
                    yField: this.yField,
                    label: {
                        visible: false
                    }
                });

                this.chart.render();
            }
        }
    }
</script>

<style scoped>

</style>