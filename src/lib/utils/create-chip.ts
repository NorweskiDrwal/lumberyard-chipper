import { produce } from 'immer';
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as TS from '../types';
import { setAsync } from '../utils';

export default function createChip<T = unknown>(chipKey: string, chipState: T): TS.IChip<T> {
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
    setData(update, actions) {
      if (update instanceof Promise) setAsync(update, this, actions);
      else if (typeof update === 'function') {
        if (typeof this.data === 'string') this.data = produce({}, update as any);
        else this.data = produce<T>(this.data, update as any);
      } else this.data = update;
      this.setStatus({ type: 'IDLE' });
    },
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
