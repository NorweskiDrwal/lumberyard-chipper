/* eslint-disable @typescript-eslint/no-explicit-any */

import * as TS from '../../types';
import { createChip } from '../utils';

export default function twigify<State = any>(parentKey: string, state: State) {
  return Object.entries(state)
    .map(([key, twigValue]) => {
      const twigKey = `${parentKey}.${key}`;
      if (typeof twigValue !== 'string') {
        const leafify = Object.entries(twigValue).map(([key, leafValue]) => {
          const leafKey = `${twigKey}.${key}`;
          const Leaf = { leafKey, chip: createChip(leafKey, leafValue) };
          return [leafKey, Leaf];
        });
        const leafs = new Map((leafify as unknown) as TS.ILeafs<State>);
        const Twig = { leafs, twigKey, chip: createChip(twigKey, twigValue) };
        return [twigKey, Twig];
      } else {
        const Twig = { twigKey, leafs: undefined, chip: createChip(twigKey, twigValue) };
        return [twigKey, Twig];
      }
    })
    .filter((s) => s);
}
