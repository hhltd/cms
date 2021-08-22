// 方式一: 手动切换三种环境
//开发环境
// const BASE_URL = 'http://www.baidu.com/dev';
// const BASE_NAME = 'coderwhy';
// 生产环境
// const BASE_URL = 'http://www.baidu.com/prod';
// const BASE_NAME = 'kobe';
//测试环境
// const BASE_URL = 'http://www.baidu.com/test';
// const BASE_NAME = 'james';

// 方式二: process.env.NODE_ENV切换 开发: development 生产: production 测试: test
let BASE_URL = '';
const TIME_OUT = 10000;
if (process.env.NODE_ENV === 'development') {
  // BASE_URL = 'http://152.136.185.210:5000'; // 会有跨域问题
  BASE_URL = '/api'; // 需要走代理
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://www.baidu.com/prod';
} else {
  BASE_URL = 'http://www.baidu.com/test';
}

export { BASE_URL, TIME_OUT };
