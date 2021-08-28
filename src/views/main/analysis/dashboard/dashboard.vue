<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <cms-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </cms-card>
      </el-col>
      <el-col :span="10">
        <cms-card title="不同城市商品销量">
          <map-echart :mapData="addressCount"></map-echart>
        </cms-card>
      </el-col>
      <el-col :span="7">
        <cms-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </cms-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <cms-card title="分类商品销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </cms-card>
      </el-col>
      <el-col :span="12">
        <cms-card title="分类商品收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </cms-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import CmsCard from '@/base-ui/card';
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart,
} from '@/components/page-echarts';

export default defineComponent({
  name: 'dashboard',
  components: {
    CmsCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart,
  },
  setup() {
    const store = useStore();
    store.dispatch('dashboard/getDashboardDataAction');
    // 分类数据饼图 玫瑰图
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount };
      });
    });
    // 折线图
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = [];
      const value: any[] = [];
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale;
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name);
        value.push(item.goodsCount);
      }
      return { xLabels, value };
    });
    // 柱状图
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = [];
      const value: any[] = [];
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor;
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name);
        value.push(item.goodsFavor);
      }
      return { xLabels, value };
    });
    // 地图
    const addressCount = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count };
      });
    });
    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressCount,
    };
  },
});
</script>

<style lang="less" scoped></style>
