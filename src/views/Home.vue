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
              <recent-return-visit :list="returnVisitList" style="min-height: 200px" />
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
import {NormalStatistics, SelfReturnVist} from "../api/template";
import PieChart from "../components/charts/PieChart";
import RecentReturnVisit from "../components/RecentReturnVisit";
export default {
  name: 'Home',
  data() {
    return {
      permission: 'delete',
      permission2: ['create', 'delete'],
      data: [],
      returnVisitList: []
    }
  },
  components: {
    RecentReturnVisit,
    PieChart,
  },
  created() {
    API(NormalStatistics).then(res => {
      this.data = res.data
    });

    this.queryRecentVisit();
  },
  methods: {
    queryRecentVisit() {
      API(SelfReturnVist).then(res => {
        this.returnVisitList = res.data;
      });
    }
  }
}
</script>
