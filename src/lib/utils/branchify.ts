import * as TS from '../../types';
import { createChip, twigify } from '.';

export default function branchify<State = any>(
  key: string,
  branches?: TS.ISeedOptions<State>['branches'],
) {
  return branches?.map((b) => {
    const branchKey = `${key}.${b[0]}`;
    const branchState = b[1];

    if (typeof branchState !== 'string') {
      const Branch = {
        branchKey,
        chip: createChip(branchKey, branchState),
        twigs: new Map((twigify(branchKey, branchState) as unknown) as TS.ITwigs<State>),
      };
      return [branchKey, Branch];
    } else {
      const Branch = {
        branchKey,
        twigs: undefined,
        chip: createChip(branchKey, branchState),
      };
      return [branchKey, Branch];
    }
  });
}
