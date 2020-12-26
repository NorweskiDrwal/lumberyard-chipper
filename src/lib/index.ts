/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import * as TS from '../types';
import { createChip } from './utils/create-chip';
import { twigify } from './utils/twigify';

const Roots: TS.IRoots = new Map([]);

const initialOptions = {
  unrooted: false,
};

export function plantSeed<SeedState = any>(
  seedKey: string,
  seedState: SeedState,
  seedOptions: TS.ISeedOptions<any> = { ...initialOptions },
) {
  const isSeedPlanted = Roots.has(seedKey);

  if (!isSeedPlanted) {
    const trunkKey = seedKey;

    // iterate branches and extend with @chipper scheme
    const branchify = seedOptions.branches?.map((b) => {
      const branchKey = `${trunkKey}.${b[0]}`;
      const branchState = b[1];

      if (typeof branchState !== 'string') {
        const Branch = {
          branchKey,
          chip: createChip(branchKey, branchState),
          twigs: new Map((twigify(branchKey, branchState) as unknown) as TS.ITwigs<SeedState>),
        };
        return [branchKey, Branch];
      } else {
        const Branch = {
          branchKey,
          twigs: undefined,
          chip: createChip(branchKey, branchState),
        };
        return [branchKey, Branch];
      }
    });

    const branches = new Map((branchify as unknown) as TS.IBranches<SeedState>);

    const Trunk = {
      branches,
      trunkKey,
      chip: createChip(trunkKey, seedState),
    };

    Roots.set(trunkKey, Trunk);
  }
}

export function useChipper<ChipState = any>(chipKey: string): TS.IChipper<ChipState> {
  const pith = chipKey.split('.');
  const trunkKey = pith[0];
  const branchKey = `${pith[0]}.${pith[1]}`;
  const twigKey = `${pith[0]}.${pith[1]}.${pith[2]}`;
  const leafKey = `${pith[0]}.${pith[1]}.${pith[2]}.${pith[3]}`;
  const isTrunked = Roots.has(trunkKey);

  const Chip = React.useMemo(() => {
    if (isTrunked) {
      const branches = Roots.get(trunkKey)?.branches;
      const isBranched = branches?.has(branchKey);
      if (isBranched) {
        const twigs = branches?.get(branchKey)?.twigs;
        const isTwiged = twigs?.has(twigKey);
        if (isTwiged) {
          const leafs = twigs?.get(twigKey)?.leafs;
          const isLeafed = leafs?.has(leafKey);
          if (isLeafed) {
            return leafs?.get(leafKey);
          } else {
            return twigs?.get(twigKey)?.chip;
          }
        } else {
          return branches?.get(branchKey)?.chip;
        }
      } else {
        return Roots.get(trunkKey)?.chip;
      }
    } else {
      console.warn(`ChipperWarning: dataset "${chipKey} doesn't exist`);
    }
  }, []);

  const [, setStatus] = React.useState(Chip?.status as TS.IStatus);

  React.useEffect(() => {
    const subscriber = (update: TS.IStatus) => {
      setStatus(update);
    };

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
        setStatus({ type, message });
        Chip?.setStatus({ type, message });
      }
    }
  };

  return {
    setData: setLocalData,
    setStatus: setLocalStatus,
    data: Chip?.getData() || null,
    status: Chip?.getStatus() || { type: 'IDLE' },
  };
}
