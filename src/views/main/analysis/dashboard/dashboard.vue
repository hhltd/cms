<template>
  <div class="dashboard">
    <div class="dashboard-echarts" ref="divRef"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import * as echarts from 'echarts';

export default defineComponent({
  name: 'dashboard',
  setup() {
    const divRef = ref<HTMLElement>();
    onMounted(() => {
      const echartInstance = echarts.init(divRef.value!);
      const options = {
        title: {
          text: 'ECharts 入门示例',
        },
        tooltip: {},
        legend: {
          data: ['销量'],
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };
      echartInstance.setOption(options);
    });
    return {
      divRef,
    };
  },
});
</script>

<style lang="less" scoped>
.dashboard {
  &-echarts {
    width: 600px;
    height: 400px;
  }
}
</style>
