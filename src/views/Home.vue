<template>
  <div class="home">
    <a-card title="数据统计" size="small">
      <a-row>
        <a-col :md="16">
          <a-row>
            <a-col :md="6">订单</a-col>
            <a-col :md="6">客户</a-col>
            <a-col :md="6">回访</a-col>
            <a-col :md="6">其他</a-col>
          </a-row>
        </a-col>
        <a-col :md="8">
            <a-divider type="vertical" ></a-divider>
            <span>其他数据</span>
        </a-col>
      </a-row>
    </a-card>

    <a-row>
      <a-col :md="16">
        <a-row>
          <a-col :md="14">
            <a-card title="收入数据" size="small"></a-card>
          </a-col>
          <a-col :md="10">
            <a-card title="回访记录" size="small">
              <ul>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
              </ul>
            </a-card>
          </a-col>
        </a-row>
        <a-card title="图形报表" size="small">
          <a-row>
            <a-col :md="8">
              <pie-chart id="chart" :data="data" color-field="name" angle-field="amount" title="订单来源分布" />
            </a-col>
            <a-col :md="8">
              <pie-chart id="chart2" :data="data" color-field="name" angle-field="amount" title="订单来源分布" />
            </a-col>
            <a-col :md="8">
              <pie-chart id="chart3" :data="data" color-field="name" angle-field="amount" title="订单来源分布" />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :md="8">
        <a-card title="备忘录" size="small">
          备忘录列表
        </a-card>
      </a-col>
    </a-row>

  </div>
</template>

<script>
// @ is an alias to /src

import {API} from "../api";
import {NormalStatistics} from "../api/template";
import PieChart from "../components/charts/PieChart";
export default {
  name: 'Home',
  data() {
    return {
      permission: 'delete',
      permission2: ['create', 'delete'],
      data: []
    }
  },
  components: {
    PieChart,
  },
  created() {
    API(NormalStatistics).then(res => {
      this.data = res.data
    });
  }
}
</script>
