<template>
  <div class="nav-header">
    <!-- 折叠 -->
    <i
      class="nav-header-fold"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldChange"
    ></i>
    <div class="nav-header-content">
      <div class="nav-header-content-left">面包屑</div>
      <div class="nav-header-content-right">
        <user-info></user-info>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UserInfo from './user-info.vue';

export default defineComponent({
  emits: ['foldChange'],
  components: {
    UserInfo,
  },
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
  display: flex;
  width: 100%;
  &-fold {
    font-size: 30px;
    cursor: pointer;
  }
  &-content {
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
    flex: 1;
  }
}
</style>
