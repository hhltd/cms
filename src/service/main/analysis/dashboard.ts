import cmsRequest from '@/service';
// import { IDataType } from '@/service/types';

enum DashBoardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor', // 收藏
  addressGoodsSale = '/goods/address/sale', // 不同地区
}

export function getCategoryGoodsCount() {
  return cmsRequest.get({
    url: DashBoardAPI.categoryGoodsCount,
  });
}

export function getCategoryGoodsSale() {
  return cmsRequest.get({
    url: DashBoardAPI.categoryGoodsSale,
  });
}

export function getCategoryGoodsFavor() {
  return cmsRequest.get({
    url: DashBoardAPI.categoryGoodsFavor,
  });
}

export function getAddressGoodsSale() {
  return cmsRequest.get({
    url: DashBoardAPI.addressGoodsSale,
  });
}
