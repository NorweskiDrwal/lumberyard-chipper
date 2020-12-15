/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as Immer from 'immer';

import * as Type from './types';

const Roots: Type.IRoots<any> = new Map([]);

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
  // const [, setData] = React.useState<Type.IData<T> | null>(Chip.data || null);
  // const [, setStatus] = React.useState<Type.IStatus>(Chip.status || { type: 'IDLE' });
  const [state, dispatch] = React.useReducer(Immer.produce, {
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

  console.log('Roots', Roots);

  return {
    chip: Chip,
    trunk: Trunk,
    roots: Roots,
  };
}

function useChip<T = unknown>(name: string) {
  const chipper = useChipper(name);

  const { chip } = chipper;
}

function createChip<T = unknown>(chipKey: string, chipData?: T): Type.IChip<T> {
  return {
    chipKey,
    data: chipData,
    status: { type: 'IDLE' },
    subscribers: [],
    getData() {
      return this.data;
    },
    setStatus(status) {
      this.status = status;
      this.subscribers.forEach((sub) => {
        if (sub.isMounted) {
          sub.updater(status);
        }
      });
    },
    setData(data) {
      this.data = data;
      this.subscribers.forEach((sub) => {
        if (sub.isMounted) {
          sub.updater(data);
        }
      });
    },
    subscribe(updater) {
      this.subscribers.push({
        updater,
        isMounted: true,
      });
    },
    unsubscribe(updater) {
      this.subscribers = this.subscribers.filter((sub) => {
        if (sub.isMounted) sub.updater !== updater;
      });
    },
  };
}
