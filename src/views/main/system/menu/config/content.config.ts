export const contentConfig = {
  title: '菜单列表',
  propList: [
    { prop: 'name', label: '系统总览', minWidth: '150' },
    { prop: 'type', label: '类型', minWidth: '60' },
    { prop: 'url', label: '菜单url', minWidth: '100' },
    { prop: 'icon', label: '图标', minWidth: '100' },
    { prop: 'permission', label: '权限', minWidth: '100' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '220',
      slotName: 'createAt',
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '220',
      slotName: 'updateAt',
    },
    { label: '操作', minWidth: '100', slotName: 'handler' },
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children',
    },
  },
  showFooter: false,
};
