/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from 'react';

import * as TS from './types';
import { branchify, createChip, locateChip } from './utils';

const Roots: TS.IRoots = new Map([]);

export function plantTree<T = any, B = any>(key: string, state: T, options?: TS.ITrunkOptions<B>) {
  if (!Roots.has(key)) {
    const branches = new Map((branchify(key, options?.branches) as unknown) as TS.IBranches<B>);
    const Trunk = { branches, trunkKey: key, chip: createChip(key, state) };
    Roots.set(key, Trunk);
  }
}

export function useChip<State = any>(chipKey: string): TS.IUseChip<State> {
  const Chip = React.useMemo(() => locateChip(chipKey, Roots).chip, [chipKey]);

  const [, setData] = React.useState(Chip?.data);
  const subscriber = React.useCallback(setData, []);

  React.useEffect(() => {
    Chip?.subscribe(subscriber);
    return () => Chip?.unsubscribe(subscriber);
  }, []);

  const setLocalData = (data: State, actions?: TS.IAsyncActions<State>) => {
    if (JSON.stringify(Chip?.data) !== JSON.stringify(data)) {
      if (Chip?.getStatus().type !== 'LOAD') Chip?.setData(data, actions);
    }
  };

  const setLocalStatus = (type: TS.IStatus['type'], message?: TS.IStatus['message']) => {
    const chipStatus = Chip?.getStatus();
    if (chipStatus?.type !== type) {
      if (chipStatus?.type !== 'LOAD') Chip?.setStatus({ type, message });
    }
  };

  return {
    setData: setLocalData,
    setStatus: setLocalStatus,
    data: Chip?.getData() || null,
    status: Chip?.getStatus() || { type: 'IDLE' },
  };
}
