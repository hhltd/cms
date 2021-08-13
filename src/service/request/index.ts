/*
 * @Author: huanghuan02
 * @Date: 2021-07-31 07:57:12
 * @LastEditors: huanghuan02
 * @LastEditTime: 2021-07-31 10:37:25
 * @Description: 网络请求
 */

import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { cmsRequestInterceptors, CMSRequestConfig } from './type';
import { ElLoading } from 'element-plus';
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type';

// 设置showLoading的默认值
const DEFAULT_LOADING = true;

class CMSRequest {
  // 多个请求 创建多个实例
  instance: AxiosInstance;
  // interceptors拦截器
  interceptors?: cmsRequestInterceptors;
  // 是否显示loading
  showLoading: boolean;
  // loading
  loading?: ILoadingInstance;

  constructor(config: CMSRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;

    // 从config中取出的拦截器是对应的实例拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch,
    );

    // 添加全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 全局添加token
        console.log('全局拦截器, 请求拦截成功');
        // 添加loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
          });
        }
        return config;
      },
      (err) => {
        console.log('全局拦截器, 请求拦截失败');
        return err;
      },
    );
    this.instance.interceptors.response.use(
      (res) => {
        // 移除loading
        this.loading?.close();
        console.log('全局拦截器, 响应拦截成功');
        const data = res.data;
        // 根据返回的data判断错误
        if (data.returnCode === '-1001') {
          console.log('请求失败');
        } else {
          return res.data;
        }
      },
      (err) => {
        console.log('全局拦截器, 响应拦截失败');
        // 移除loading
        this.loading?.close();
        // 判断不同的http状态码
        if (err.response.status === 404) {
          console.log('404错误');
        }
        return err;
      },
    );
  }

  request<T>(config: CMSRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors?.requestInterceptors(config);
      }
      //关闭loading 但这样会影响下一次请求 因为实例的showLoading被置位fasle
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors?.responseInterceptors(res);
          }
          // 恢复showLoading
          this.showLoading = DEFAULT_LOADING;
          // 将结果返回出去
          resolve(res);
        })
        .catch((err) => {
          // 恢复showLoading
          this.showLoading = DEFAULT_LOADING;
          reject(err);
          return err;
        });
    });
  }

  get<T>(config: CMSRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'get' });
  }

  post<T>(config: CMSRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'post' });
  }

  delete<T>(config: CMSRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'delete' });
  }

  patch<T>(config: CMSRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'patch' });
  }
}

export default CMSRequest;
