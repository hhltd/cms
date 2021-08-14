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
