<template>
    <div id="line-chart">

    </div>
</template>

<script>
    import {Line} from '@antv/g2plot';

    export default {
        name: "LineChart",
        props: {
            data: {},
            title: {},
            xField: {},
            yField: {}
        },
        mounted() {
            const linePlot = new Line('canvas', {
                data: this.data,
                title: {
                    text: this.title,
                    visible: true
                },
                point: {
                    visible: true,
                },
                label: {
                    visible: true,
                },
                xField: this.xField,
                yField: this.yField,
            });
            linePlot.render();
        }
    }
</script>

<style scoped>

</style>