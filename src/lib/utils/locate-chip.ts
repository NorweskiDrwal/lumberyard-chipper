/* eslint-disable @typescript-eslint/no-explicit-any */

import * as TS from '../../types';

export default function locateChip<T = any>(
  chipKey: string,
  roots: TS.IRoots<T>,
): TS.ILocateChip<T> {
  const pith = chipKey.split('.');
  const trKey = pith[0];
  const brKey = `${trKey}.${pith[1]}`;
  const twKey = `${brKey}.${pith[2]}`;
  const lfKey = `${twKey}.${pith[3]}`;

  if (roots.has(trKey)) {
    const branches = roots.get(trKey)?.branches;
    if (branches?.has(brKey)) {
      const twigs = branches?.get(brKey)?.twigs;
      if (twigs?.has(twKey)) {
        const leafs = twigs?.get(twKey)?.leafs;
        if (leafs?.has(lfKey)) return leafs?.get(lfKey);
        else return twigs?.get(twKey);
      } else return branches?.get(brKey);
    } else return roots.get(trKey);
  } else console.warn(`ChipperError: chip "${chipKey}" doesn't exist`);
}
