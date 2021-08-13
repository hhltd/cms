/*
 * @Author: huanghuan02
 * @Date: 2021-07-24 00:15:17
 * @LastEditors: huanghuan02
 * @LastEditTime: 2021-07-30 23:42:47
 * @Description:
 */
module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'element-plus',
        customStyleName: (name) => {
          return `element-plus/lib/theme-chalk/${name}.css`;
        },
      },
    ],
  ],
  presets: ['@vue/cli-plugin-babel/preset'],
};
