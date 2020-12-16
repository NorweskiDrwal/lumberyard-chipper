/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as Immer from 'immer';

import * as Type from './types';
import { createChip } from './utils';

export const Roots: Type.IRoots<any> = new Map([]);

const initialOptions: Type.ITrunkOptions = {
  unroot: true,
  branches: undefined,
};

export function createTrunk<T = unknown>(
  trunkKey: string,
  initialState: T,
  options = initialOptions,
) {
  if (!Roots.get(trunkKey)) {
    const Rootify = {
      trunkKey: trunkKey,
      unroot: options.unroot,
      branches: new Map([]) as Type.IBranches<T>,
      chip: createChip<T>(trunkKey, initialState),
    };

    Roots.set(trunkKey, Rootify);

    if (Roots.get(trunkKey)!.trunkKey === trunkKey) {
      if (options?.branches) {
        options.branches.map((branch) => {
          const chipKey = branch[0];
          const chipData = branch[1];
          const branchKey = `${trunkKey}.${chipKey}`;
          const Branch = {
            branchKey,
            chip: createChip<T>(chipKey, chipData),
          };

          if (branchKey.includes(trunkKey)) {
            Roots.get(trunkKey)!.branches.set(branchKey, Branch);
          }
        });
      }
    }
  }
}

export function useChipper<T = unknown>(key: string) {
  const originPath = key.split('.');
  const trunkKey = originPath[0];
  const chipKey = originPath[1];
  const branchKey = `${trunkKey}.${chipKey}`;

  const Trunk = Roots.get(trunkKey)!;
  const Branch = Trunk && Trunk.branches.get(branchKey);

  if (trunkKey && !Trunk) {
    throw new Error(`Chipper: Trunk "${trunkKey}" doesn't exist`);
  }

  if (chipKey && !Branch) {
    const branch = {
      branchKey,
      chip: createChip<T>(chipKey, undefined),
    };
    Trunk.branches.set(branchKey, branch);
  }

  const Chip = Branch?.chip || Trunk?.chip;
  const [, dispatch] = React.useReducer(Immer.produce, {
    data: Chip.data,
    status: Chip.status,
  }) as [Type.IReducer<T>, Type.IDispatch<T>];

  React.useEffect(() => {
    function dataSubscriber(data: Type.IData<T>) {
      dispatch((draft) => {
        draft.data = data;
      });
    }
    function statusSubscriber(status: Type.IStatus) {
      dispatch((draft) => {
        draft.status = status;
      });
    }

    Chip.subscribe(dataSubscriber);
    Chip.subscribe(statusSubscriber);

    return () => {
      Chip.unsubscribe(dataSubscriber);
      Chip.unsubscribe(statusSubscriber);
    };
  }, []);

  return {
    chip: Chip,
    trunk: Trunk,
    roots: Roots,
  };
}

export { default as Chip } from './utils/Chip';
export { default as useChip } from './utils/use-chip';
