<template>
  <div class="nav-menu">
    <div class="nav-menu-logo">
      <img class="nav-menu-logo-img" src="~@/assets/imgs/logo.svg" alt="logo" />
      <span v-if="!collapse" class="nav-menu-logo-title">Vue3 + TS</span>
    </div>
    <!-- 菜单 -->
    <el-menu
      default-active="2"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <el-submenu :index="item.id + ''">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
// import { IRootState } from '@/store/types';

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const userMenus = computed(() => store.state.login.userMenus);
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-found',
      });
    };
    return {
      userMenus,
      handleMenuItemClick,
    };
  },
});
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
  &-logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    &-img {
      height: 100%;
      margin: 0 10px;
    }
    &-title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }
  .el-submenu {
    background-color: #001529 !important;
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }
  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }
  .el-menu-item:hover {
    color: #fff !important;
  }
  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 100%;
    height: calc(100% - 48px);
  }
}
</style>
