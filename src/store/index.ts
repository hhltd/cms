import { createStore, Store, useStore as useVuexStore } from 'vuex';
import login from './login/login';
import system from './main/system/system';
import dashboard from './main/analysis/dashboard';
import { getPageListData } from '@/service/main/system/system';
import { IRootState, IStoreType } from './types';

const store = createStore<IRootState>({
  state() {
    return {
      name: 'coderwhy',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: [],
    };
  },
  mutations: {
    changeEntireDepartment(state, list: any[]) {
      state.entireDepartment = list;
    },
    changeEntireRole(state, list: any[]) {
      state.entireRole = list;
    },
    changeEntireMenu(state, list: any[]) {
      state.entireMenu = list;
    },
  },
  actions: {
    async getInitialDataAction({ commit }) {
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000,
      });
      const { list: departmentList } = departmentResult.data;
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000,
      });
      const { list: roleList } = roleResult.data;
      const menuResult = await getPageListData('/menu/list', {});
      const { list: menuList } = menuResult.data;
      console.log(menuList);
      commit('changeEntireDepartment', departmentList);
      commit('changeEntireRole', roleList);
      commit('changeEntireMenu', menuList);
    },
  },
  modules: {
    login,
    system,
    dashboard,
  },
});

// 处理网页刷新后vuex数据清空问题
export function setupStore() {
  store.dispatch('login/loadLocalLogin');
  // store.dispatch('getInitialDataAction');
}
// 处理vuex访问modules中数据类型为any的问题
export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default store;
