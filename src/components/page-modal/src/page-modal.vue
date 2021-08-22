<template>
  <div class="page-modal">
    <el-dialog
      title="新建用户"
      v-model="dialogVisible"
      width="30%"
      center
      destroy-on-close
    >
      <cms-form v-bind="modalConfig" v-model="formData"></cms-form>
      <!-- 新建角色时, 预留插槽配置权限树 -->
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useStore } from '@/store';
import CmsForm from '@/base-ui/form';

export default defineComponent({
  components: {
    CmsForm,
  },
  props: {
    modalConfig: {
      type: Object,
      required: true,
    },
    defaultInfo: {
      type: Object,
      default: () => ({}),
    },
    otherInfo: {
      type: Object,
      default: () => ({}),
    },
    pageName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const dialogVisible = ref<boolean>(false);
    const formData = ref<any>({});
    watch(
      () => props.defaultInfo,
      (nv) => {
        console.log(nv);
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = nv[`${item.field}`];
        }
      },
    );
    const handleConfirm = () => {
      dialogVisible.value = false;
      if (Object.keys(props.defaultInfo).length) {
        console.log('编辑');
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id,
        });
      } else {
        console.log('新建');
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo },
        });
      }
    };
    return {
      dialogVisible,
      formData,
      handleConfirm,
    };
  },
});
</script>

<style scoped></style>
