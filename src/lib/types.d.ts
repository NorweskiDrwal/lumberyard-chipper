/* eslint-disable @typescript-eslint/no-explicit-any */

export type ITrunkOptions<T = any> = Partial<{
  branches: [string, T][];
}>;
export type IRoots<T = any> = Map<string, IParent<T>>;
export type IBranches<T = any> = Map<string, IParent<T>>;

export interface IParent<T = any> {
  key: string;
  chip: IChip<T>;
  children: IBranches<T>;
}
export interface IStatus {
  type: 'LOAD' | 'IDLE' | 'SUCCESS' | 'ERROR';
  message?: Error | string;
}

export type ISubscribe = (v: IStatus) => void;
export type IData<T = any> = T | null | undefined | string;
export type IReducedData<T> = (data: Draft<IData<T>>) => void;
export type ISetData<T> = IData<T> | IReducedData<T>;

export interface IAsyncActions<T> {
  onInit?: () => void;
  onError?: () => void;
  onSuccess?: () => void;
  responseWrap?: (...args: any[]) => IChip<T>['data'];
}

export interface IChip<T = any> {
  status: IStatus;
  data: IData<T>;
  subscribers: ISubscribe[];
  //
  getData: () => IChip<T>['data'];
  getStatus: () => IChip<T>['status'];
  //
  subscribe: (updater: ISubscribe) => void;
  unsubscribe: (updater: ISubscribe) => void;
  //
  setStatus: (status: IStatus) => void;
  setData: (update: ISetData<T>, asyncActions?: IAsyncActions<T>) => void;
  //
  readonly chipKey: string;
}

export interface IUseChip<T = any> {
  data: IChip<T>['data'];
  status: IChip<T>['status'];
  setData: IChip<T>['setData'];
  setStatus: (type: IStatus['type'], message?: IStatus['message']) => void;
}

export interface IUseChipper<T = any> extends IUseChip<T> {
  chipper: {
    getData: (chipKey: string) => IData<T>;
    setData: (chipKey: string, update: ISetData<T>, asyncActions?: IAsyncActions<T>) => void;
    api: {
      delete: (chipKey: string) => void;
    };
  };
}
