<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container class="main-content-page">
        <el-header class="main-content-page-header">
          <nav-header @foldChange="handleFoldChange"></nav-header>
        </el-header>
        <el-main class="main-content-page-content">
          <div class="main-content-page-content-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import NavMenu from '@/components/nav-menu';
import NavHeader from '@/components/nav-header';

export default defineComponent({
  components: {
    NavMenu,
    NavHeader,
  },
  setup() {
    const isCollapse = ref<boolean>(false);
    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold;
    };
    return {
      isCollapse,
      handleFoldChange,
    };
  },
});
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &-content {
    height: 100%;
    &-page {
      height: 100%;
      &-content {
        height: calc(100% - 40px);
        &-info {
          background-color: #fff;
        }
      }
    }
  }
  .el-header,
  .el-footer {
    display: flex;
    color: #333;
    text-align: center;
    align-items: center;
  }
  .el-header {
    height: 48px !important;
  }
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .el-main {
    color: #333;
    text-align: center;
    background-color: #f0f2f5;
  }
}
</style>
