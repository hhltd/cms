import { Module } from 'vuex';

import {
  getAddressGoodsSale,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale,
} from '@/service/main/analysis/dashboard';
import { IDashboardState } from './types';
import { IRootState } from '../../types';

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [], // 收藏
      addressGoodsSale: [], // 不同地区
    };
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list.data;
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list.data;
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list.data;
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list.data;
    },
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountResult = await getCategoryGoodsCount();
      // console.log(categoryCountResult);
      commit('changeCategoryGoodsCount', categoryCountResult);
      const categorySaleResult = await getCategoryGoodsSale();
      // console.log(categorySaleResult);
      commit('changeCategoryGoodsSale', categorySaleResult);
      const categoryFavorResult = await getCategoryGoodsFavor();
      commit('changeCategoryGoodsFavor', categoryFavorResult);
      const addressSaleResult = await getAddressGoodsSale();
      commit('changeAddressGoodsSale', addressSaleResult);
      console.log(addressSaleResult);
    },
  },
};

export default dashboardModule;
