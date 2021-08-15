<template>
  <div class="nav-header">
    <!-- 折叠 -->
    <i
      class="nav-header-fold"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldChange"
    ></i>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref<boolean>(false);
    const handleFoldChange = () => {
      isFold.value = !isFold.value;
      emit('foldChange', isFold.value);
    };
    return {
      isFold,
      handleFoldChange,
    };
  },
});
</script>

<style scoped lang="less">
.nav-header {
  &-fold {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
