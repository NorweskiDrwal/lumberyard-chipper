/* eslint-disable @typescript-eslint/no-explicit-any */

import * as TS from '../types';

export default function locateChip<T>(chipKey: string, roots: TS.IRoots<T>) {
  const pith = chipKey.split('.');
  const trKey = pith[0];
  const brKey = `${trKey}.${pith[1]}`;

  if (roots.has(trKey)) {
    const branches = roots.get(trKey)?.children;
    if (branches?.has(brKey)) {
      return branches?.get(brKey);
    } else return roots.get(trKey);
  } else console.warn(`ChipperError: chip "${chipKey}" doesn't exist`);
}
