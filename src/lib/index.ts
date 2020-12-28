/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from 'react';

import * as TS from './types';
import { branchify, createChip, locateChip } from './utils';

const Roots: TS.IRoots = new Map([]);

export function plantTree<T = any, B = any>(key: string, state: T, options?: TS.ITrunkOptions<B>) {
  if (!Roots.has(key)) {
    const children = new Map((branchify(key, options?.branches) as unknown) as TS.IBranches<B>);
    const Trunk = { children, key, chip: createChip<T>(key, state) };
    Roots.set(key, Trunk);
  }
}

export function useChipper<T = any>(chipperKey: string): TS.IUseChipper<T> {
  const CurrentChip = useChip<T>(chipperKey);
  const Chipper = React.useCallback((chipKey) => locateChip(chipKey, Roots), [chipperKey]);

  const deleteTarget = React.useCallback((chipKey) => {
    if (chipKey !== chipperKey) {
      const pith = chipKey.split('.');
      const parent = pith
        .slice(0, pith.length - 1)
        .toString()
        .replace(',', '.');

      const TargetChip = Chipper(parent);
      TargetChip.children.delete(chipKey);
    } else console.warn(`ChipperWarn: You're cutting the branch (${chipKey}) you're sitting on`);
  }, []);

  const getTargetData = React.useCallback((chipKey: string) => Chipper(chipKey).chip.getData(), []);

  const setTargetData = React.useCallback(
    (chipKey: string, update: TS.ISetData<T>, asyncActions?: TS.IAsyncActions<T>) => {
      const TargetChip = Chipper(chipKey).chip;

      if (JSON.stringify(TargetChip?.data) !== JSON.stringify(update)) {
        if (TargetChip?.getStatus().type !== 'LOAD') TargetChip?.setData(update, asyncActions);
      }
    },
    [],
  );

  return {
    ...CurrentChip,
    chipper: {
      getData: getTargetData,
      setData: setTargetData,
      api: {
        delete: deleteTarget,
      },
    },
  };
}

export function useChip<State = unknown>(chipKey: string): TS.IUseChip<State> {
  const Chip = React.useMemo(() => locateChip<State>(chipKey, Roots).chip, [chipKey]);

  const [, setChipStatus] = React.useState(Chip?.status);
  const subscriber = React.useCallback(setChipStatus, []);

  React.useEffect(() => {
    Chip?.subscribe(subscriber);
    return () => Chip?.unsubscribe(subscriber);
  }, []);

  const setData = (update: TS.ISetData<State>, asyncActions?: TS.IAsyncActions<State>) => {
    if (JSON.stringify(Chip?.data) !== JSON.stringify(update)) {
      if (Chip?.getStatus().type !== 'LOAD') Chip?.setData(update, asyncActions);
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
