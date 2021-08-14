import loginModule from '@/store/login/login';
import cmsRequest from '../index';
import { IAccount, IDataType, ILoginResult } from './types';

enum loginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/',
}

export function accountLoginRequest(account: IAccount) {
  return cmsRequest.post<IDataType<ILoginResult>>({
    url: loginAPI.AccountLogin,
    data: account,
  });
}

export function requestUserInfoById(id: number) {
  return cmsRequest.get<IDataType>({
    url: `${loginAPI.LoginUserInfo}${id}`,
  });
}

export function requestUserMenusByRoleId(id: number) {
  return cmsRequest.get<IDataType>({
    url: `${loginAPI.UserMenus}${id}/menu`,
  });
}
