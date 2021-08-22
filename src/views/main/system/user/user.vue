<template>
  <div class="user">
    <page-search
      :searchFormConfig="formConfig"
      @resetData="handleReset"
      @searchData="handleSearchData"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentConfig="contentConfig"
      pageName="user"
      @newClick="handleNewClick"
      @editClick="handleEditClick"
    ></page-content>
    <page-modal
      pageName="user"
      ref="pageModalRef"
      :modalConfig="modalConfigRef"
      :defaultInfo="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';

import PageSearch from '@/components/page-search';
import { formConfig } from './config/search.config';

import { contentConfig } from './config/content.config';
import PageContent from '@/components/page-content';

import PageModal from '@/components/page-modal';
import { modalConfig } from './config/modal.config';

import { usePageSearch } from '@/hooks/use-page-search';
import { usePageModal } from '@/hooks/use-page-modal';

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModal,
  },
  setup() {
    const [pageContentRef, handleReset, handleSearchData] = usePageSearch();

    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password',
      );
      passwordItem!.isHidden = false;
    };
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password',
      );
      passwordItem!.isHidden = true;
    };
    const store = useStore();
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId',
      );
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { text: item.name, value: item.id };
      });

      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId',
      );
      roleItem!.options = store.state.entireRole.map((item) => {
        return { text: item.name, value: item.id };
      });
      return modalConfig;
    });

    const [defaultInfo, pageModalRef, handleNewClick, handleEditClick] =
      usePageModal(newCallback, editCallback);
    return {
      modalConfigRef,
      pageContentRef,
      formConfig,
      contentConfig,
      handleReset,
      handleSearchData,
      pageModalRef,
      handleNewClick,
      handleEditClick,
      defaultInfo,
    };
  },
});
</script>

<style lang="less" scoped></style>
