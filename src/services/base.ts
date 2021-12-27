/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { get, post, PageResult, Response, baseUri } from "@api/request";

export interface ModuleList {
  createdAt?: string;
  id?: number;
  moduleCode?: string;
  ModuleName?: string;
  operator?: string;
  updatedAt?: string;
}

export interface moduleSetupReal {
  createdAt?: string;
  id?: number;
  moduleId?: string;
  realId?: number;
  realName?: string;
  realType?: number;
  sort?: number;
  operator?: string;
  updatedAt?: string;
}

export function modulesList() {
  return get<any, Response<ModuleList[]>>(`${baseUri}/moduleSetup/list`, {});
}

export function modulesInsert(params: moduleSetupReal[]) {
  return post<any, Response<any>>(`${baseUri}/moduleSetupReal/insert`, params);
}

export function modulesRealList(moduleId: any) {
  return post<any, Response<PageResult<moduleSetupReal>>>(
    `${baseUri}/moduleSetupReal/list/${moduleId}`,
    {
      size: 10,
      page: 1,
    }
  );
}
