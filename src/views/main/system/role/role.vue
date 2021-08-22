<template>
  <div class="role">
    <page-content
      :contentConfig="contentConfig"
      pageName="role"
      @newClick="handleNewClick"
      @editClick="handleEditClick"
    ></page-content>
    <page-modal
      pageName="role"
      ref="pageModalRef"
      :modalConfig="modalConfig"
      :otherInfo="otherInfo"
      :defaultInfo="defaultInfo"
    >
      <div class="role-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheck"
        >
        </el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, nextTick } from 'vue';
import { ElTree } from 'element-plus';
import { useStore } from '@/store';
import PageContent from '@/components/page-content';
import { contentConfig } from './config/content.config';
import PageModal from '@/components/page-modal';
import { modalConfig } from '../role/config/modal.config';

import { usePageModal } from '@/hooks/use-page-modal';
import { getMenuLeafKeys } from '@/utils/map-menus';

export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    PageModal,
  },
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>();
    const store = useStore();
    const menus = computed(() => store.state.entireMenu);
    const otherInfo = ref({});
    const editCallback = (item: any) => {
      const leafKeys = getMenuLeafKeys(item.menuList);
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false);
      });
      console.log('000', leafKeys);
    };
    const [defaultInfo, pageModalRef, handleNewClick, handleEditClick] =
      usePageModal(undefined, editCallback);

    const handleCheck = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys;
      const halfCheckedKeys = data2.halfCheckedKeys;
      const menuList = [...checkedKeys, ...halfCheckedKeys];
      otherInfo.value = { menuList };
      // console.log(data1);
      // console.log(data2);
    };
    return {
      elTreeRef,
      contentConfig,
      modalConfig,
      menus,
      otherInfo,
      defaultInfo,
      pageModalRef,
      handleNewClick,
      handleEditClick,
      handleCheck,
    };
  },
});
</script>

<style lang="less" scoped>
.role {
  &-tree {
    margin-left: 25px;
  }
}
</style>
