/* eslint-disable @typescript-eslint/no-explicit-any */
export type ISeedOptions<BranchState = any> = Partial<{
  unrooted: boolean;
  branches: [string, BranchState][];
}>;
export type IRoots<RootState = any> = Map<string, ITrunk<RootState>>;
export interface ITrunk<TrunkState = any> {
  trunkKey: string;
  chip: IChip<TrunkState>;
  branches: IBranches<TrunkState>;
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
export type ILeafs<State = any> = Map<string, IChip<State>>;
export interface IStatus {
  type: 'LOAD' | 'IDLE' | 'SUCCESS' | 'ERROR';
  message?: Error | string;
}
export interface IAsyncActions<T> {
  onError?: () => void;
  onSuccess?: () => void;
  responseWrap?: (...args: any[]) => IChip<T>['data'];
}

export interface IChip<ChipState = any> {
  data: ChipState | null | undefined;
  chipKey: string;
  status: IStatus;
  subscribers: any[];
  //
  getData: () => IChip['data'];
  getStatus: () => IChip['status'];
  //
  setData: (data: IChip['data'], actions?: IAsyncActions<ChipState>) => void;
  setStatus: (type: TS.IStatus['type'], message?: TS.IStatus['message']) => void;
  //
  subscribe: (updater: any) => void;
  unsubscribe: (updater: any) => void;
}

export interface IChipper<ChipperState = any> {
  data: IChip<ChipperState>['data'];
  status: IChip<ChipperState>['status'];
  setData: IChip<ChipperState>['setData'];
  setStatus: IChip<ChipperState>['setStatus'];
}
