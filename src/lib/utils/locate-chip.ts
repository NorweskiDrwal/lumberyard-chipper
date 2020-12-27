import * as TS from '../../types';

export default function locateChip<ChipState = any>(
  chipKey: string,
  roots: TS.IRoots<ChipState>,
): TS.ILocateChip<ChipState> {
  const pith = chipKey.split('.');
  const trunkKey = pith[0];
  const branchKey = `${pith[0]}.${pith[1]}`;
  const twigKey = `${pith[0]}.${pith[1]}.${pith[2]}`;
  const leafKey = `${pith[0]}.${pith[1]}.${pith[2]}.${pith[3]}`;

  const isTrunked = roots.has(trunkKey);

  if (isTrunked) {
    const branches = roots.get(trunkKey)?.branches;
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
          return twigs?.get(twigKey);
        }
      } else {
        return branches?.get(branchKey);
      }
    } else {
      return roots.get(trunkKey);
    }
  } else {
    console.warn(`ChipperError: dataset "${chipKey}" doesn't exist`);
  }
}
