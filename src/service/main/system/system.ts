import cmsRequest from '@/service';
import { IDataType } from '@/service/types';

export function getPageListData(url: string, queryInfo: any) {
  return cmsRequest.post<IDataType>({
    url: url,
    data: queryInfo,
  });
}

export function deletePageData(url: string) {
  return cmsRequest.delete<IDataType>({
    url: url,
  });
}

export function createPageData(url: string, newData: any) {
  return cmsRequest.post<IDataType>({
    url,
    data: newData,
  });
}

export function editPageData(url: string, editData: any) {
  return cmsRequest.patch<IDataType>({
    url,
    data: editData,
  });
}
