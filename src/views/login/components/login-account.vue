<!--
 * @Author: huanghuan02
 * @Date: 2021-07-31 11:43:53
 * @LastEditors: huanghuan02
 * @LastEditTime: 2021-07-31 13:08:24
 * @Description:
-->

<template>
  <div class="login-account">
    <el-form
      :model="rules"
      status-icon
      ref="ruleFormRef"
      :rules="rules"
      label-width="60px"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { ElForm } from 'element-plus';
import { rules } from '../config/account-config';

export default defineComponent({
  setup() {
    // 定义账号密码
    const account = reactive({
      name: '',
      password: '',
    });
    const ruleFormRef = ref<InstanceType<typeof ElForm>>();

    // 登录逻辑
    const loginAction = () => {
      ruleFormRef.value?.validate((valid) => {
        if (valid) {
          // 登录
        }
      });
      console.log('正在登录中');
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
