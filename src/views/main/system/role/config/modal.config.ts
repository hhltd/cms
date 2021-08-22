import { IForm } from '@/base-ui/form';

export const modalConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      placeholder: '请输入角色名',
    },
    {
      field: 'intro',
      type: 'input',
      label: '权限介绍',
      placeholder: '请输入权限介绍',
    },
  ],
  itemStyle: {},
  colLayout: { span: 24 },
};
