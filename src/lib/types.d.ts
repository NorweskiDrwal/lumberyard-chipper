export type ITrunkOptions<BranchState = unknown> = Partial<{
  branches: [string, BranchState][];
}>;
export type IRoots<RootState = any> = Map<string, ITrunk<RootState>>;
export interface ITrunk<TrunkState = unknown> {
  trunkKey: string;
  chip: IChip<TrunkState>;
  branches: IBranches<TrunkState>;
  unrooted?: boolean;
}
export type IBranches<State = unknown> = Map<string, IBranch<State>>;
export interface IBranch<BranchState = unknown> {
  branchKey: string;
  chip: IChip<BranchState>;
  twigs: ITwigs<BranchState>;
}
export type ITwigs<State = unknown> = Map<string, ITwig<State>>;
export interface ITwig<TwigState = unknown> {
  twigKey: string;
  chip: IChip<TwigState>;
  leafs: ILeafs<TwigState>;
}
export type ILeafs<State = unknown> = Map<string, ILeaf<State>>;
export interface ILeaf<LeafState = unknown> {
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
  | TS.ILeaf<State>;

export type ISubscribe = (v: IStatus) => void;
export type IData<T = unknown> = T | null | undefined | string;
export type IReducedData<T> = (data: Draft<IData<T>>) => void;
export type ISetData<T> = IData<T> | IReducedData<T>;

export interface IAsyncActions<State> {
  onInit?: () => void;
  onError?: () => void;
  onSuccess?: () => void;
  responseWrap?: (...args: unknown[]) => IChip<State>['data'];
}

export interface IChip<ChipState = unknown> {
  status: IStatus;
  data: IData<ChipState>;
  subscribers: ISubscribe[];
  //
  getData: () => IChip<ChipState>['data'];
  getStatus: () => IChip<ChipState>['status'];
  //
  subscribe: (updater: ISubscribe) => void;
  unsubscribe: (updater: ISubscribe) => void;
  //
  setStatus: (status: IStatus) => void;
  setData: (update: ISetData<ChipState>, actions?: IAsyncActions<T>) => void;
  //
  readonly chipKey: string;
}

export interface IUseChip<ChipState = unknown> {
  data: IChip<ChipState>['data'];
  status: IChip<ChipState>['status'];
  setData: IChip<ChipState>['setData'];
  setStatus: (type: IStatus['type'], message?: IStatus['message']) => void;
}

export interface IUseChipper<ChipperState = unknown> {
  data: IChip<ChipperState>['data'];
  status: IChip<ChipperState>['status'];
  setData: IChip<ChipState>['setData'];
  setStatus: IChip<ChipState>['setStatus'];
}
