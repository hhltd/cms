<template>
  <div class="line-echart">
    <base-echart :options="lineOptions"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import BaseEchart from '@/base-ui/echart';
import { IDataType } from '../types';

const props = defineProps<{
  xLabels: string[];
  value: any[];
}>();

const lineOptions = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.xLabels,
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '分类销量',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: props.value,
      },
    ],
  };
});
</script>

<style scoped></style>
