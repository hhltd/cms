<!--
 * @Author: huanghuan02
 * @Date: 2021-07-31 11:44:04
 * @LastEditors: huanghuan02
 * @LastEditTime: 2021-07-31 13:13:23
 * @Description:
-->

<template>
  <div class="login-phone">
    <el-form
      :model="phone"
      status-icon
      ref="ruleForm"
      :rules="rules"
      label-width="70px"
    >
      <el-form-item label="手机号" prop="number">
        <el-input v-model="phone.number"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="login-phone-code">
          <el-input v-model="phone.code"></el-input>
          <el-button class="login-phone-code-btn" type="primary"
            >获取验证码</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { rules } from '../config/phone-config';

export default defineComponent({
  setup() {
    // 定义手机号密码
    const phone = reactive({
      number: '',
      code: '',
    });
    return {
      phone,
      rules,
    };
  },
});
</script>

<style scoped lang="less">
.login-phone {
  &-code {
    display: flex;
    &-btn {
      margin-left: 5px;
    }
  }
}
</style>
