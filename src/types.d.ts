/* eslint-disable @typescript-eslint/no-explicit-any */

export type IData<State = any> = State | null | undefined | string;
export type ISeedOptions<BranchState = any> = Partial<{
  branches: [string, BranchState][];
}>;
export type IRoots<RootState = any> = Map<string, ITrunk<RootState>>;
export interface ITrunk<TrunkState = any> {
  trunkKey: string;
  chip: IChip<TrunkState>;
  branches: IBranches<TrunkState>;
  unrooted?: boolean;
}
export type IBranches<State = any> = Map<string, IBranch<State>>;
export interface IBranch<BranchState = any> {
  branchKey: string;
  chip: IChip<BranchState>;
  twigs: ITwigs<BranchState>;
}
export type ITwigs<State = any> = Map<string, ITwig<State>>;
export interface ITwig<TwigState = any> {
  twigKey: string;
  chip: IChip<TwigState>;
  leafs: ILeafs<TwigState>;
}
export type ILeafs<State = any> = Map<string, ILeaf<State>>;
export interface ILeaf<LeafState = any> {
  leafKey: string;
  chip: IChip<LeafState>;
}
export interface IStatus {
  type: 'LOAD' | 'IDLE' | 'SUCCESS' | 'ERROR';
  message?: Error | string;
}
export type ILocateChip<State> =
  | TS.ITrunk<State>
  | TS.IBranch<State>
  | TS.ITwig<State>
  | TS.ILeaf<State>
  | undefined;

export type ISubscriber = (v: IStatus) => void;
export type IDispatch<T> = (f: (draft: IChip<T>) => void) => void;
export type IDispatchData<T> = (f: (draft: IChip<T>['data']) => void) => void;

export interface IAsyncActions<State> {
  onInit?: () => void;
  onError?: () => void;
  onSuccess?: () => void;
  responseWrap?: (...args: any[]) => IChip<State>['data'];
}

export interface IChip<ChipState = any> {
  status: IStatus;
  data: IData<ChipState>;
  subscribers: ISubscriber[];
  //
  getData: () => IChip<ChipState>['data'];
  getStatus: () => IChip<ChipState>['status'];
  //
  subscribe: (updater: ISubscriber) => void;
  unsubscribe: (updater: ISubscriber) => void;
  //
  setData: (data: IChip<ChipState>['data'], actions?: IAsyncActions<ChipState>) => void;
  setStatus: (type: TS.IStatus['type'], message?: TS.IStatus['message']) => void;
  //
  readonly chipKey: string;
}

export interface IUseChip<ChipState = any> {
  data: IChip<ChipState>['data'];
  status: IChip<ChipState>['status'];
  setData: IChip<ChipState>['setData'];
  setStatus: IChip<ChipState>['setStatus'];
}

export interface IUseChipper<ChipperState = any> {
  data: IChip<ChipperState>['data'];
  status: IChip<ChipperState>['status'];
  setData: IChip<ChipState>['setData'];
  setStatus: IChip<ChipState>['setStatus'];
}
