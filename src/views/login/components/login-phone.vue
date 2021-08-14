<template>
  <div class="login-phone">
    <el-form
      :model="phone"
      status-icon
      ref="ruleFormRef"
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
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { rules } from '../config/phone-config';
import { ElForm } from 'element-plus';

export default defineComponent({
  setup() {
    // 定义手机号密码
    const phone = reactive({
      number: '',
      code: '',
    });
    const ruleFormRef = ref<InstanceType<typeof ElForm>>();
    const store = useStore();
    // 手机号登录
    const phoneAction = () => {
      ruleFormRef.value?.validate((valid) => {
        if (valid) {
          store.dispatch('login/phoneLoginAction', { ...phone });
        }
      });
    };

    return {
      phone,
      rules,
      ruleFormRef,
      phoneAction,
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
