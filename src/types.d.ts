/* eslint-disable @typescript-eslint/no-explicit-any */
import { Draft } from 'immer';

export type IData<T> = T | null | undefined | Promise<T | void>;
export type IRoots<T = unknown> = Map<string, IRootify<T>>;
export type IBranches<T = unknown> = Map<string, IBranch<T>>;
export type IStatusType = 'LOAD' | 'ERROR' | 'SUCCESS' | 'IDLE';
export type IDispatch<T> = (f: (draft: IReducer<T>) => void) => void;

export interface IRootify<T = unknown> {
  chip: IChip<T>;
  unroot?: boolean;
  trunkKey: string;
  branches: IBranches<T>;
}
export interface IBranch<T = unknown> {
  chip: IChip<T>;
  branchKey: string;
}

export interface IReducer<T> {
  data: IData<T>;
  status: IStatus;
}
export interface ITrunkOptions {
  unroot?: boolean;
  branches?: [string, any][];
}
export interface IAsyncActions<T> {
  onError?: void;
  timeout?: number;
  onSuccess?: void;
  responseWrap?: (...args: any[]) => IData<T>;
}
export interface ISubscriber<T> {
  isMounted: boolean;
  updater: (v: IData<T> | IStatus) => void;
}
export interface IApi<T> {
  roots?: IRoots<T>;
  trunk: IRootify<T>;
}
export interface IStatus {
  type: IStatusType;
  message?: Error | string;
}
export interface IChip<T = unknown> {
  data: IData<T>;
  status: IStatus;
  //
  getData(): IData<T>;
  setData(data: IData<T>): void;
  setStatus(type: Type.IStatus['type'], message?: Type.IStatus['message']): void;
  //
  subscribers: ISubscriber<T>[];
  subscribe(cb: ISubscriber<T>['updater']): void;
  unsubscribe(cb: ISubscriber<T>['updater']): void;
  //
  readonly chipKey: string;
}
export interface IChipper<T = unknown> {
  api: IApi<T>;
  data: IChip<T>['data'];
  status: IStatus;
  setData: (data: IData<T>) => void;
  setAsyncData(async: IData<any>, actions?: IAsyncActions<T>): void;
  setStatus(type: Type.IStatus['type'], message?: Type.IStatus['message']): void;
}

export type ChipComponentProps<T = unknown> = T & {
  chip?: IChipper<T>;
};
export type Chip<T = unknown> = React.FC<ChipComponentProps<T>>;
