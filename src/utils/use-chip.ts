import { useChipper } from '..';

import setAsync from './set-async';
import * as Type from '../types';

export default function useChip<T = unknown>(name: string): Type.IChipper<T> {
  const chipper = useChipper(name);

  return {
    data: chipper.chip.data,
    status: chipper.chip.status,
    setData: (update) => {
      chipper.chip.setData(update);
    },
    setStatus: (type, message) => {
      chipper.chip.setStatus({ type, message });
    },
    setAsyncData: (async, actions) => {
      setAsync(async, chipper.chip, actions);
    },
    api: {
      roots: chipper.roots,
      trunk: chipper.trunk,
    },
  };
}
