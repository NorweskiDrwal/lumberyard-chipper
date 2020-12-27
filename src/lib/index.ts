/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from 'react';

import * as TS from '../types';
import { branchify, createChip, locateChip } from './utils';

const Roots: TS.IRoots = new Map([]);

export function plantSeed<SeedState = any>(
  seedKey: string,
  seedState: SeedState,
  seedOptions?: TS.ISeedOptions<any>,
) {
  const isSeedPlanted = Roots.has(seedKey);

  if (!isSeedPlanted) {
    const trunkKey = seedKey;

    const branches = new Map(
      (branchify(trunkKey, seedOptions?.branches) as unknown) as TS.IBranches<SeedState>,
    );

    const Trunk = {
      branches,
      trunkKey,
      chip: createChip(trunkKey, seedState),
    };

    Roots.set(trunkKey, Trunk);
  }
}

export function useChip<ChipState = any>(chipKey: string): TS.IUseChip<ChipState> {
  const Chip = React.useMemo(() => locateChip(chipKey, Roots).chip, [chipKey]);

  const [, setStatus] = React.useState(Chip?.status);

  const subscriber = React.useCallback((update: TS.IStatus) => {
    setStatus(update);
  }, []);

  React.useEffect(() => {
    Chip?.subscribe(subscriber);

    return () => {
      Chip?.unsubscribe(subscriber);
    };
  }, []);

  const setLocalData = (data: ChipState, actions?: TS.IAsyncActions<ChipState>) => {
    if (JSON.stringify(Chip?.data) !== JSON.stringify(data)) {
      if (Chip?.getStatus().type !== 'LOAD') {
        Chip?.setData(data, actions);
      }
    }
  };

  const setLocalStatus = (type: TS.IStatus['type'], message?: TS.IStatus['message']) => {
    const chipStatus = Chip?.getStatus();
    if (chipStatus?.type !== type) {
      if (chipStatus?.type !== 'LOAD') {
        Chip?.setStatus({ type, message });
      }
    }
  };

  console.log('Roots', Roots);

  return {
    setData: setLocalData,
    setStatus: setLocalStatus,
    data: Chip?.getData() || null,
    status: Chip?.getStatus() || { type: 'IDLE' },
  };
}
