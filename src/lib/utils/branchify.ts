/* eslint-disable @typescript-eslint/no-explicit-any */

import * as TS from '../types';
import { createChip, twigify } from '../utils';

export default function branchify<T = any>(key: string, branches?: [string, T][]) {
  return branches?.map((b) => {
    const branchKey = `${key}.${b[0]}`;
    const branchState = b[1];

    if (typeof branchState !== 'string') {
      const twigs = new Map((twigify<T>(branchKey, branchState) as unknown) as TS.ITwigs<T>);
      const Branch = { branchKey, twigs, chip: createChip<T>(branchKey, branchState) };
      return [branchKey, Branch];
    } else {
      const Branch = { branchKey, twigs: undefined, chip: createChip<T>(branchKey, branchState) };
      return [branchKey, Branch];
    }
  });
}
