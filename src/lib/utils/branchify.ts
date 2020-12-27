/* eslint-disable @typescript-eslint/no-explicit-any */

import * as TS from '../types';
import { createChip, twigify } from '../utils';

export default function branchify<State = any>(key: string, branches?: [string, State][]) {
  return branches?.map((b) => {
    const branchKey = `${key}.${b[0]}`;
    const branchState = b[1];

    if (typeof branchState !== 'string') {
      const twigs = new Map((twigify(branchKey, branchState) as unknown) as TS.ITwigs<State>);
      const Branch = { branchKey, twigs, chip: createChip(branchKey, branchState) };
      return [branchKey, Branch];
    } else {
      const Branch = { branchKey, twigs: undefined, chip: createChip(branchKey, branchState) };
      return [branchKey, Branch];
    }
  });
}
