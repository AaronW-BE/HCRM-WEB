<template>
  <div class="home">
    <div class="box-container">
      <a-alert message="测试阶段，有问题随时提交" banner  />
    </div>

    <a-card size="small"  style="min-height: 100px">
      <a-row :gutter="{md: 50}">
        <a-col :md="16">
          <a-row :gutter="{md: 10}">
            <a-col :md="6">
              <a-card title="订单" size="small">
                <span class="data-value">{{baseStatistics.order || 'N/A'}}</span>
              </a-card>
            </a-col>
            <a-col :md="6">
              <a-card title="客户" size="small">
                <span class="data-value">{{baseStatistics.customer || 'N/A'}}</span>
              </a-card>
            </a-col>
            <a-col :md="6">
              <a-card title="回访" size="small">
                <span class="data-value">{{baseStatistics.visit || 'N/A'}}</span>
              </a-card>
            </a-col>
            <a-col :md="6">
              <a-card title="其他" size="small">
                <span class="data-value">{{0}}</span>
              </a-card>
            </a-col>
          </a-row>
        </a-col>
        <a-col :md="8">
          <a-card title="其他" size="small">
            <span class="data-value">{{'N/A'}}</span>
          </a-card>
        </a-col>
      </a-row>
    </a-card>

    <a-row style="margin-top: 5px;">
      <a-col :md="16">
        <a-row>
          <a-col :md="14">
            <a-card title="收入数据" size="small"  style="height: 300px">
              <bar-chart id="incomeChart" :data="income" x-field="value" y-field="label" style="height: 250px" />
            </a-card>
          </a-col>
          <a-col :md="10">
            <a-card title="回访记录" size="small"  style="min-height: 300px">
              <recent-return-visit :list="returnVisitList" />
            </a-card>
          </a-col>
        </a-row>
        <a-card title="图形报表" size="small">
          <a-row>
            <a-col :md="8">
              <pie-chart id="chart" :data="data" color-field="name" angle-field="amount" title="订单来源分布" style="height: 200px;" />
            </a-col>
            <a-col :md="8">
              <pie-chart id="chart2" :data="data" color-field="name" angle-field="amount" title="订单来源分布" style="height: 200px;" />
            </a-col>
            <a-col :md="8">
              <pie-chart id="chart3" :data="data" color-field="name" angle-field="amount" title="订单来源分布" style="height: 200px;" />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :md="8">
        <a-card title="备忘录" size="small"  style="min-height: 200px">
          备忘录列表
        </a-card>
      </a-col>
    </a-row>

  </div>
</template>

<script>
// @ is an alias to /src

import {API} from "../api";
import {NormalStatistics, SelfBaseStatistic, SelfReturnVisit} from "../api/template";
import PieChart from "../components/charts/PieChart";
import RecentReturnVisit from "../components/RecentReturnVisit";
import BarChart from "../components/charts/BarChart";
export default {
  name: 'Home',
  data() {
    return {
      permission: 'delete',
      permission2: ['create', 'delete'],
      data: [],
      income: [
        {
          label: "总收入",
          value: 230,
        },
        {
          label: "销售金额",
          value: 160,
        },
        {
          label: "其他",
          value: 70,
        },
      ],
      returnVisitList: [],
      baseStatistics: {}
    }
  },
  components: {
    BarChart,
    RecentReturnVisit,
    PieChart,
  },
  created() {
    API(NormalStatistics).then(res => {
      this.data = res.data
    });

    this.queryRecentVisit();
    this.queryBaseStatisticsData();
  },
  methods: {
    queryRecentVisit() {
      API(SelfReturnVisit).then(res => {
        this.returnVisitList = res.data;
      });
    },
    queryBaseStatisticsData() {
      API(SelfBaseStatistic).then(res => {
        this.baseStatistics = res.data;
        console.log(res);
      });
    }
  }
}
</script>

<style scoped>
  .data-value {
    font-size: 1.5rem;
  }
</style>
