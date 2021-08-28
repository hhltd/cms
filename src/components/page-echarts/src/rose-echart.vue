<template>
  <div class="rose-echart">
    <base-echart :options="roseOptions"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import BaseEchart from '@/base-ui/echart';
import { IDataType } from '../types';

const props = defineProps<{
  roseData: IDataType[];
}>();

const roseOptions = computed(() => {
  return {
    legend: {
      top: 'bottom',
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: [20, 80],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 6,
        },
        data: props.roseData,
      },
    ],
  };
});
</script>

<style scoped></style>
