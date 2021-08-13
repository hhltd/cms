/*
 * @Author: huanghuan02
 * @Date: 2021-07-31 12:37:11
 * @LastEditors: huanghuan02
 * @LastEditTime: 2021-07-31 13:12:15
 * @Description:
 */

export const rules = {
  number: [
    {
      required: true,
      message: '手机号不能为空',
      trigger: 'blur',
    },
    {
      pattern: /^1\d{10}$/,
      message: '手机号格式不正确',
      trigger: 'blur',
    },
  ],
};
