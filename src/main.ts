import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { registerApp } from './global/index';
// import cmsRequest from './service';
import 'normalize.css'; // css样式初始化
import './assets/css/index.less';
// import ElementPlus from 'element-plus' //全局引用
// import 'element-plus/lib/theme-chalk/index.css' // 需要单独引入样式
import { setupStore } from './store';

const app = createApp(App);
app.use(store);
setupStore();
app.use(router);
// app.use(ElementPlus)
registerApp(app);
app.mount('#app');
