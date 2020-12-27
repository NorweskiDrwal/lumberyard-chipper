/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from 'react';

import * as TS from './types';
import { branchify, createChip, locateChip } from './utils';

const Roots: TS.IRoots = new Map([]);

export function plantTree<T = any, B = any>(key: string, state: T, options?: TS.ITrunkOptions<B>) {
  if (!Roots.has(key)) {
    const branches = new Map((branchify(key, options?.branches) as unknown) as TS.IBranches<B>);
    const Trunk = { branches, trunkKey: key, chip: createChip<T>(key, state) };
    Roots.set(key, Trunk);
  }
}

export function useChip<State = unknown>(chipKey: string): TS.IUseChip<State> {
  const Chip = React.useMemo(() => locateChip<State>(chipKey, Roots).chip, [chipKey]);

  const [, setChipStatus] = React.useState(Chip?.status);
  const subscriber = React.useCallback(setChipStatus, []);

  React.useEffect(() => {
    Chip?.subscribe(subscriber);
    return () => Chip?.unsubscribe(subscriber);
  }, []);

  const setData = (update: TS.ISetData<State>, actions?: TS.IAsyncActions<State>) => {
    if (JSON.stringify(Chip?.data) !== JSON.stringify(update)) {
      if (Chip?.getStatus().type !== 'LOAD') Chip?.setData(update, actions);
    }
  };

  const setStatus = (type: TS.IStatus['type'], message?: TS.IStatus['message']) => {
    const chipStatus = Chip?.getStatus();
    if (chipStatus?.type !== type) {
      if (chipStatus?.type !== 'LOAD') Chip?.setStatus({ type, message });
    }
  };

  console.log('Roots', Roots);

  return {
    setData,
    setStatus,
    data: Chip?.getData() || null,
    status: Chip?.getStatus() || { type: 'IDLE' },
  };
}
