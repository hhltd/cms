<template>
  <div class="user">
    <div class="user-search">
      <el-form label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户名">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="真实姓名">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户名">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="真实姓名">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="user-content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'user',
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
