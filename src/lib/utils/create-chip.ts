import { produce } from 'immer';

import * as TS from '../../types';
import setAsync from './set-async';

export default function createChip<ChipState = unknown>(
  chipKey: string,
  chipState: ChipState,
): TS.IChip<ChipState> {
  return {
    chipKey,
    data: chipState,
    status: { type: 'IDLE' },
    subscribers: [],
    getData() {
      return this.data;
    },
    getStatus() {
      return this.status;
    },
    setData(update) {
      this.data = update(this.data);
      // if (typeof update === 'function') {
      // }
    },
    // setData(data, actions) {
    //   if (data instanceof Promise) {
    //     setAsync<ChipState>(data, this, actions);
    //   } else {
    //     this.data = data;
    //     this.setStatus({ type: 'IDLE' });
    //   }
    // },
    setStatus(status) {
      this.status = status;
      this.subscribers.forEach((sub) => {
        sub(status);
      });
    },
    subscribe(updater) {
      this.subscribers.push(updater);
    },
    unsubscribe(updater) {
      this.subscribers = this.subscribers.filter((sub) => sub !== updater);
    },
  };
}
