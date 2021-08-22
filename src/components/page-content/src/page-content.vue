<template>
  <div class="page-content">
    <cms-table
      :dataCount="dataCount"
      :listData="dataList"
      v-bind="contentConfig"
      v-model:page="pageInfo"
    >
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          size="medium"
          type="primary"
          @click="handleNew"
          >新增用户</el-button
        >
      </template>

      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>
      <template #handler="scope">
        <div class="user-content-handler-buttons">
          <el-button
            v-if="isUpdate"
            icon="el-icon-edit"
            size="mini"
            type="text"
            @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            icon="el-icon-delete"
            size="mini"
            type="text"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <template
        v-for="item in otherPropSlot"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </cms-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import { useStore } from '@/store';
import CmsTable from '@/base-ui/table';
import { usePermission } from '@/hooks/use-permission';

export default defineComponent({
  props: {
    contentConfig: {
      default: Object,
      required: true,
    },
    pageName: {
      type: String,
      required: true,
    },
  },
  components: {
    CmsTable,
  },
  emits: ['newClick', 'editClick'],
  setup(props, { emit }) {
    const store = useStore();
    let isCreate: boolean;
    let isUpdate: boolean;
    let isDelete: boolean;
    let isQuery: boolean;
    switch (props.pageName) {
      case 'user':
        isCreate = usePermission('users', 'create');
        isUpdate = usePermission('users', 'update');
        isDelete = usePermission('users', 'delete');
        isQuery = usePermission('users', 'query');
        break;
      default:
        isCreate = usePermission(props.pageName, 'create');
        isUpdate = usePermission(props.pageName, 'update');
        isDelete = usePermission(props.pageName, 'delete');
        isQuery = usePermission(props.pageName, 'query');
        break;
    }
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 10,
    });
    watch(pageInfo, () => {
      getPageData();
    });
    // 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      console.log(isQuery);
      console.log('发送网络请求');
      if (!isQuery) return;
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo,
        },
      });
    };
    getPageData();

    const dataList = computed(() =>
      store.getters['system/getPageList'](props.pageName),
    );
    const dataCount = computed(() =>
      store.getters['system/getPageCount'](props.pageName),
    );

    const otherPropSlot = props.contentConfig?.propList.filter((item: any) => {
      if (item.slotName === 'status') return false;
      if (item.slotName === 'createAt') return false;
      if (item.slotName === 'updateAt') return false;
      if (item.slotName === 'handler') return false;
      return true;
    });

    const handleDelete = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id,
      });
    };

    const handleNew = () => {
      emit('newClick');
    };
    const handleEdit = (item: any) => {
      emit('editClick', item);
    };

    return {
      handleNew,
      handleEdit,
      pageInfo,
      dataList,
      dataCount,
      getPageData,
      otherPropSlot,
      isCreate,
      isUpdate,
      isDelete,
      handleDelete,
    };
  },
});
</script>

<style lang="less" scoped>
.page-content {
  padding: 10px 20px;
  border-top: 10px solid #f5f5f5;
}
</style>
