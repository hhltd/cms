/*
 * @Author: huanghuan02
 * @Date: 2021-07-31 08:53:32
 * @LastEditors: huanghuan02
 * @LastEditTime: 2021-07-31 10:31:50
 * @Description: 类型文件
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface cmsRequestInterceptors<T = AxiosResponse> {
  //请求拦截 可选
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorsCatch?: (err: any) => any;
  // 响应拦截 可选
  responseInterceptors?: (config: T) => T;
  responseInterceptorsCatch?: (err: any) => any;
}

// 扩展AxiosRequestConfig
export interface CMSRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: cmsRequestInterceptors<T>;
  showLoading?: boolean;
}
