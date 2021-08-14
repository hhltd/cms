// 校验规则
export const rules = {
  name: [
    {
      required: true,
      message: '账号不能为空',
      trigger: 'blur',
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '账号必须为5-10个字符',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
    {
      pattern: /^[a-z0-9]{5,}$/,
      message: '密码长度不能小于5个字符',
      trigger: 'blur',
    },
  ],
};
