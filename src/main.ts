import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { registerApp } from './global/index';
import cmsRequest from './service';
import 'normalize.css';
import './assets/css/index.less';
// import ElementPlus from 'element-plus' //全局引用
// import 'element-plus/lib/theme-chalk/index.css' // 需要单独引入样式

const app = createApp(App);
app.use(store);
app.use(router);
// app.use(ElementPlus)
registerApp(app);
app.mount('#app');

// 请求数据类型
interface DataType {
  data: any;
  returnCode: string;
  success: boolean;
}

// 请求1
// cmsRequest.request({
//   url: '/home/multidata',
//   method: 'get',
//   interceptors: {
//     requestInterceptors: (config) => {
//       console.log('单独请求的config');
//       return config;
//     },
//     responseInterceptors: (res) => {
//       console.log('单独响应的config');
//       return res;
//     },
//   },
//   // showLoading: false,
// });

// 请求2
cmsRequest
  .get<DataType>({
    url: '/home/multidata',
  })
  .then((res) => {
    console.log(res.data);
    console.log(res.returnCode);
    console.log(res.success);
  });
