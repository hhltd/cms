<template>
  <div class="page-search">
    <CMSForm v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2>高级检索</h2>
      </template>
      <template #footer>
        <div class="page-search-button">
          <el-button icon="el-icon-refresh" @click="handleReset"
            >重置</el-button
          >
          <el-button type="primary" icon="el-icon-search" @click="handleSearch"
            >搜索</el-button
          >
        </div>
      </template>
    </CMSForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CMSForm from '@/base-ui/form';

export default defineComponent({
  components: {
    CMSForm,
  },
  props: {
    searchFormConfig: {
      type: Object,
      required: true,
    },
  },
  emits: ['resetData', 'searchData'],
  setup(props, { emit }) {
    const formItems = props.searchFormConfig.formItems ?? [];
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.field] = '';
    }
    const formData = ref(formOriginData);
    const handleReset = () => {
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key];
      }
      emit('resetData');
      // formData.value = formOriginData;
    };
    const handleSearch = () => {
      emit('searchData', formData.value);
    };

    return {
      formData,
      handleReset,
      handleSearch,
    };
  },
});
</script>

<style lang="less" scoped>
.page-search {
  &-button {
    text-align: right;
    padding: 0 50px 20px 0;
  }
}
</style>
