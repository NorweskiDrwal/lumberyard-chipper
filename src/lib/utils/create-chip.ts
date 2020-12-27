/* eslint-disable @typescript-eslint/no-explicit-any */

import * as TS from '../types';
import { setAsync } from '../utils';

export default function createChip<T = any>(chipKey: string, chipState: T): TS.IChip<T> {
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
    setData(data, actions) {
      if (data instanceof Promise) setAsync(data, this, actions);
      else {
        this.data = data;
        this.setStatus({ type: 'IDLE' });
      }
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
