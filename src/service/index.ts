// axios文件出口
import CMSRequest from './request';
import { BASE_URL, TIME_OUT } from './request/config';
import localCache from '@/utils/cache';

const cmsRequest = new CMSRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors: (config) => {
      // 请求实例添加token
      const token = localCache.getCache('token'); // 从缓存中取token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // console.log('请求拦截器');
      return config;
    },
    requestInterceptorsCatch: (err) => {
      // console.log('请求失败拦截器');
      return err;
    },
    responseInterceptors: (res) => {
      // console.log('响应拦截器');
      return res;
    },
    responseInterceptorsCatch: (err) => {
      // console.log('响应失败拦截器');
      return err;
    },
  },
});
export default cmsRequest;
