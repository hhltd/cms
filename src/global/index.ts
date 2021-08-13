/*
 * @Author: huanghuan02
 * @Date: 2021-07-30 23:48:00
 * @LastEditors: huanghuan02
 * @LastEditTime: 2021-07-31 00:00:45
 * @Description:入口文件
 */
import { App } from 'vue';
import registerElement from './register-element';

export function registerApp(app: App): void {
  registerElement(app);
}
