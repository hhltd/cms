<template>
  <div class="login-account">
    <el-form
      :model="account"
      status-icon
      ref="ruleFormRef"
      :rules="rules"
      label-width="60px"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { ElForm } from 'element-plus';
import { rules } from '../config/account-config';
import localCache from '@/utils/cache';

export default defineComponent({
  setup() {
    // 定义账号密码
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? '',
    });
    const ruleFormRef = ref<InstanceType<typeof ElForm>>();
    const store = useStore();

    // 真正的登录逻辑
    const loginAction = (iskeepPWD: boolean) => {
      ruleFormRef.value?.validate((valid) => {
        if (valid) {
          // 1、判断是否需要记住密码
          if (iskeepPWD) {
            // 本地缓存
            localCache.setCache('name', account.name);
            localCache.setCache('password', account.password);
          } else {
            localCache.deleteCache('name');
            localCache.deleteCache('password');
          }
          // 2、开始进行登录验证
          store.dispatch('login/accountLoginAction', { ...account });
        }
      });
    };

    return {
      account,
      rules,
      ruleFormRef,
      loginAction,
    };
  },
});
</script>

<style scoped></style>
