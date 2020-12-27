/* eslint-disable @typescript-eslint/no-explicit-any */

import { createChip } from '../utils';

export default function branchify<T = any>(key: string, branches?: [string, T][]) {
  return branches?.map((b) => {
    const branchKey = `${key}.${b[0]}`;
    const branchState = b[1];
    const Branch = { key: branchKey, chip: createChip<T>(branchKey, branchState) };
    return [branchKey, Branch];
  });
}
