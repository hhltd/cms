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

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
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
    },
  },
  actions: {
    // 账号登录
    async accountLoginAction({ commit }, payload: IAccount) {
      // 登录逻辑
      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult.data;
      commit('changeToken', token);
      localCache.setCache('token', token);
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
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token');
      if (token) {
        commit('changeToken', token);
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
