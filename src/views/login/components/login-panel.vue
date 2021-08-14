<template>
  <div class="login-panel">
    <h1 class="login-panel-title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机注册</span>
        </template>
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="login-panel-control">
      <el-checkbox v-model="iskeepPWD">记住密码</el-checkbox>
      <el-link>忘记密码</el-link>
    </div>
    <div class="login-panel-login">
      <el-button
        class="login-panel-login-btn"
        type="primary"
        @click="handleLoginClick"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoginAccount from './login-account.vue';
import LoginPhone from './login-phone.vue';

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone,
  },
  setup() {
    const iskeepPWD = ref(true); // 类型推导
    // LoginAccount类型(LoginAccount实际是一个组件描述符, 需要拿到它的实例) InstanceType<typeof LoginAccount>
    const accountRef = ref<InstanceType<typeof LoginAccount>>();
    const phoneRef = ref<InstanceType<typeof LoginPhone>>();
    const currentTab = ref<string>('account');
    // 登录
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(iskeepPWD.value);
      } else {
        phoneRef.value?.phoneAction();
      }
    };

    return {
      iskeepPWD,
      accountRef,
      phoneRef,
      currentTab,
      handleLoginClick,
    };
  },
});
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 120px;
  &-title {
    text-align: center;
  }
  &-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  &-login {
    &-btn {
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>
