<template>
    <div :id="id"></div>
</template>

<script>
    import {Pie} from '@antv/g2plot';

    export default {
        props: {
            id: {},
            data: {},
            title: {},
            angleField: {},
            colorField: {}
        },
        name: "PieChart",
        data() {
            return {
                chart: null
            }
        },
        mounted() {
            this.drawChart();
        },
        watch: {
            data() {
                this.drawChart();
            }
        },
        methods: {
            drawChart() {
                this.chart && this.chart.destroy();
                this.chart = new Pie(this.id, {
                    forceFit: true,
                    data: this.data,
                    title: {
                        text: this.title,
                        visible: true
                    },
                    radius: 0.8,
                    label: {
                        visible: true,
                        type: 'outer',
                        offset: 20,
                    },
                    angleField: this.angleField,
                    colorField: this.colorField,
                });

                this.chart.render();
            }
        }
    }
</script>

<style scoped>

</style>