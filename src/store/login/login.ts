import { Module } from 'vuex';
import router from '@/router';
import { ILoginState } from './types';
import { IRootState } from '../types';
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId,
} from '@/service/login/login';
import { IAccount } from '@/service/login/types';
import localCache from '@/utils/cache';
import { mapMenusToRoutes, mapMenusToPermission } from '@/utils/map-menus';

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: [],
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;
      // 将userMenus映射到routes
      const routes = mapMenusToRoutes(userMenus);
      // console.log(routes);
      // 将routes添加到main -> children
      routes.forEach((route) => {
        router.addRoute('main', route);
      });
      const permission = mapMenusToPermission(userMenus);
      state.permissions = permission;
      // console.log(permission);
    },
  },
  actions: {
    // 账号登录
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 登录逻辑
      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult.data;
      commit('changeToken', token);
      localCache.setCache('token', token);
      // 保证拿到token
      dispatch('getInitialDataAction', null, { root: true });
      // 用户信息
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      commit('changUserInfo', userInfo);
      localCache.setCache('userInfo', userInfo);
      // 获取当前角色的菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      commit('changeUserMenus', userMenus);
      localCache.setCache('userMenus', userMenus);
      // 跳转首页
      router.push('/main');
    },
    // 处理网页刷新后vuex数据清空问题
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token');
      if (token) {
        commit('changeToken', token);
        dispatch('getInitialDataAction', null, { root: true });
      }
      const userInfo = localCache.getCache('userInfo');
      if (userInfo) {
        commit('changUserInfo', userInfo);
      }
      const userMenus = localCache.getCache('userMenus');
      if (userMenus) {
        commit('changeUserMenus', userMenus);
      }
    },
    // 手机号登录
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('执行phoneLoginAction');
    // },
  },
};

export default loginModule;
