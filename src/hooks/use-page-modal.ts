import { ref } from 'vue';
import PageModal from '@/components/page-modal';

type CallbackType = (item?: any) => void;
export function usePageModal(newCb?: CallbackType, editCb?: CallbackType) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>();
  const defaultInfo = ref({});
  const handleNewClick = () => {
    defaultInfo.value = {};
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }
    newCb && newCb();
  };
  const handleEditClick = (item: any) => {
    defaultInfo.value = { ...item };
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }
    editCb && editCb(item);
  };
  return [defaultInfo, pageModalRef, handleNewClick, handleEditClick];
}
