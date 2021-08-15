<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span class="user-info-name">{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <i class="el-icon-s-custom"></i>
            退出登录</el-dropdown-item
          >
          <el-dropdown-item>
            <i class="el-icon-document"></i>
            用户信息</el-dropdown-item
          >
          <el-dropdown-item>
            <i class="el-icon-setting"></i>
            系统管理</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const name = computed(() => store.state.name);

    return {
      name,
    };
  },
});
</script>

<style scoped lang="less">
.user-info {
  .el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  &-name {
    display: inline-block;
    margin-left: 5px;
  }
}
</style>
