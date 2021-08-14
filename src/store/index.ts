import { createStore } from 'vuex';
import login from './login/login';
import { IRootState } from './types';

const store = createStore<IRootState>({
  state() {
    return {
      name: 'coderwhy',
      age: 18,
    };
  },
  mutations: {},
  actions: {},
  modules: {
    login,
  },
});

// 处理网页刷新后vuex数据清空问题
export function setupStore() {
  store.dispatch('login/loadLocalLogin');
}

export default store;
