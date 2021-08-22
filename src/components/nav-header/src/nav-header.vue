<template>
  <div class="nav-header">
    <!-- 折叠 -->
    <i
      class="nav-header-fold"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldChange"
    ></i>
    <div class="nav-header-content">
      <div class="nav-header-content-left">
        <nav-bread-crumb :breadcrumb="breadcrumbs"></nav-bread-crumb>
      </div>
      <div class="nav-header-content-right">
        <user-info></user-info>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import UserInfo from './user-info.vue';
import { useStore } from 'vuex';
import NavBreadCrumb from '@/base-ui/breadcrumb';
import { pathMapBreadCrumbs } from '@/utils/map-menus';

export default defineComponent({
  emits: ['foldChange'],
  components: {
    UserInfo,
    NavBreadCrumb,
  },
  setup(props, { emit }) {
    const isFold = ref<boolean>(false);

    const handleFoldChange = () => {
      isFold.value = !isFold.value;
      emit('foldChange', isFold.value);
    };
    // 面包屑数据
    const breadcrumbs = computed(() => {
      const store = useStore();
      const route = useRoute();
      const userMenus = store.state.login.userMenus;
      const currentPath = route.path;
      return pathMapBreadCrumbs(userMenus, currentPath);
    });
    return {
      isFold,
      breadcrumbs,
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
