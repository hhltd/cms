import { IRootState } from '@/store/types';
import { ISystemState } from './types';
import {
  deletePageData,
  getPageListData,
  createPageData,
  editPageData,
} from '@/service/main/system/system';
import { Module } from 'vuex';

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      roleList: [],
      goodsList: [],
      menuList: [],
      userCount: 0,
      roleCount: 0,
      goodsCount: 0,
      menuCount: 0,
    };
  },
  getters: {
    getPageList(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'user':
            return state.userList;
          case 'role':
            return state.roleList;
          case 'goods':
            return state.goodsList;
          case 'menu':
            return state.menuList;
        }
      };
    },
    getPageCount(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'user':
            return state.userCount;
          case 'role':
            return state.roleCount;
          case 'goods':
            return state.goodsCount;
          case 'menu':
            return state.menuCount;
        }
      };
    },
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList;
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount;
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList;
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount;
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList;
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount;
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList;
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount;
    },
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      console.log('进来了');
      const pageName = payload.pageName;
      let pageUrl = '';
      switch (pageName) {
        case 'user':
          pageUrl = '/users/list';
          break;
        case 'role':
          pageUrl = '/role/list';
          break;
        case 'goods':
          pageUrl = '/goods/list';
          break;
        case 'menu':
          pageUrl = '/menu/list';
          break;
      }
      console.log('payload', payload);
      const pageResult = await getPageListData(pageUrl, payload.queryInfo);
      console.log('pageResult', pageResult);
      const { list, totalCount } = pageResult.data;
      console.log('000', list);
      switch (pageName) {
        case 'user':
          commit(`changeUserList`, list);
          commit(`changeUserCount`, totalCount);
          break;
        case 'role':
          commit(`changeRoleList`, list);
          commit(`changeRoleCount`, totalCount);
          break;
        case 'goods':
          commit(`changeGoodsList`, list);
          commit(`changeGoodsCount`, totalCount);
          break;
        case 'menu':
          commit(`changeMenuList`, list);
          commit(`changeMenuCount`, totalCount);
          break;
      }
    },

    async deletePageDataAction({ dispatch }, payload: any) {
      const { pageName, id } = payload;
      let pageUrl = '';
      switch (pageName) {
        case 'user':
          pageUrl = `/users/${id}`;
          break;
      }
      await deletePageData(pageUrl);
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },

    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload;
      console.log('xxx', pageName, newData);
      let pageUrl = '';
      switch (pageName) {
        case 'user':
          pageUrl = '/users';
          break;
      }
      await createPageData(pageUrl, newData);
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },

    async editPageDataAction({ dispatch }, payload: any) {
      const { pageName, editData, id } = payload;
      console.log(editData);
      let pageUrl = '';
      switch (pageName) {
        case 'user':
          pageUrl = `/users/${id}`;
          break;
      }
      await editPageData(pageUrl, editData);
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },
  },
};

export default systemModule;
