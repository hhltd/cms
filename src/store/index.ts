import { createStore, Store, useStore as useVuexStore } from 'vuex';
import login from './login/login';
import { IRootState, IStoreType } from './types';

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
// 处理vuex访问modules中数据类型为any的问题
export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default store;
