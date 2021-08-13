<!--
 * @Author: huanghuan02
 * @Date: 2021-07-24 01:59:05
 * @LastEditors: huanghuan02
 * @LastEditTime: 2021-07-31 11:28:02
 * @Description:
-->
<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginPanel from './components/login-panel.vue';

export default defineComponent({
  components: {
    LoginPanel,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/imgs/login-bg.svg');
}
</style>
