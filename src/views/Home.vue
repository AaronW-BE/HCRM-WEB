<template>
  <div class="home">
    <div class="box-container">
      <a-alert message="测试阶段，有问题随时提交" banner  />
    </div>

    <!--    <a-card size="small"  style="min-height: 100px">-->
      <a-row :gutter="{md: 50}">
        <a-col :md="24">
          <a-row :gutter="{md: 10}">
            <a-col :md="6">
              <chart-card title="销售总额" :total="'￥' + (baseStatistics.salesVolume || 0)">
                <a-tooltip title="本月总销售额" slot="action">
                  <a-icon type="info-circle-o" />
                </a-tooltip>
<!--                <div>-->
<!--                  <trend :type="true" term="周同比" :percentage="3.5" style="margin-right: 10px" />-->
<!--                  <trend :type="false" term="日同比" :percentage="11"></trend>-->
<!--                </div>-->
                <template slot="footer">日均销售额<span>￥ {{(baseStatistics.salesVolume / 30).toFixed(2)}}</span></template>
              </chart-card>
            </a-col>
            <a-col :md="6">
              <chart-card title="订单总数" :total="baseStatistics.order || 0">
                <a-tooltip title="本月订单总数" slot="action">
                  <a @click="$router.push({name: 'orderList'})" ><a-icon type="info-circle-o" /></a>
                </a-tooltip>
                <div style="height: 100%">
                  <area-chart id="order"  :data="baseStatistics.orderInMonth" x-field="name" y-field="amount" />
                </div>
                <template slot="footer">日均订单数：<span> {{baseStatistics.order / ( baseStatistics.orderInMonth && baseStatistics.orderInMonth.length)}} </span></template>
              </chart-card>
            </a-col>
            <a-col :md="6">
              <chart-card title="客户" :total="baseStatistics.customer || 0">
                <a-tooltip title="本月新增客户总数" slot="action">
                  <a @click="$router.push({name: 'customerList'})" ><a-icon type="info-circle-o" /></a>
                </a-tooltip>
                <template slot="footer">日均新增用户：<span>N/A</span></template>
              </chart-card>
            </a-col>
            <a-col :md="6">
              <chart-card title="回访" :total="baseStatistics.returnVisit || 0">
                <a-tooltip title="本月回访数量" slot="action">
                  <a @click="$router.push({name: 'returnList'})" ><a-icon type="info-circle-o" /></a>
                </a-tooltip>
                <template slot="footer">日均销售额<span>￥ 234.56</span></template>
              </chart-card>
            </a-col>
          </a-row>
        </a-col>
<!--        <a-col :md="6">-->
<!--          <chart-card title="其他数据" :total="'N/A'">-->
<!--            <template slot="footer">日均销售额<span>￥ 234.56</span></template>-->
<!--          </chart-card>-->
<!--        </a-col>-->
      </a-row>
<!--    </a-card>-->

    <a-row style="margin-top: 5px;">
      <a-col :md="16">
        <a-row>
          <a-col :md="14">
            <a-card title="收入数据（示例）" size="small"  style="height: 300px">
              <bar-chart id="incomeChart" :data="income" x-field="value" y-field="label" style="height: 250px" />
            </a-card>
          </a-col>
          <a-col :md="10">
            <a-card title="回访记录" size="small"  style="min-height: 300px">
              <a slot="extra" @click="$router.push({name: 'returnList'})">
                 <a-tooltip title="查看全部">
                    <a-icon type="ellipsis" />
                 </a-tooltip>
              </a>
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
              <div>暂未开发</div>
<!--              <pie-chart id="chart2" :data="data" color-field="name" angle-field="amount" title="订单来源分布" style="height: 200px;" />-->
            </a-col>
            <a-col :md="8">
              <div>暂未开发</div>
              <!--              <pie-chart id="chart3" :data="data" color-field="name" angle-field="amount" title="订单来源分布" style="height: 200px;" />-->
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
import ChartCard from "../components/charts/ChartCard";
// import Trend from "../components/charts/Trend";
import AreaChart from "../components/charts/AreaChart";
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
    AreaChart,
    // Trend,
    ChartCard,
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
      API(SelfReturnVisit, {
        data: {
          size: 6
        }
      }).then(res => {
        this.returnVisitList = res.data.results;
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
