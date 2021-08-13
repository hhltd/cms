/*
 * @Author: huanghuan02
 * @Date: 2021-07-31 00:13:54
 * @LastEditors: huanghuan02
 * @LastEditTime: 2021-07-31 08:16:58
 * @Description: 环境配置
 */

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
  BASE_URL = 'http://123.207.32.32:8000/';
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://www.baidu.com/prod';
} else {
  BASE_URL = 'http://www.baidu.com/test';
}

export { BASE_URL, TIME_OUT };
