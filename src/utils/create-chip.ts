import * as Type from '../types';

export default function createChip<T = unknown>(chipKey: string, chipData?: T): Type.IChip<T> {
  return {
    chipKey,
    data: chipData,
    status: { type: 'IDLE' },
    subscribers: [],
    getData() {
      return this.data;
    },
    setData(data) {
      this.data = data;
      this.subscribers.forEach((sub) => {
        if (sub.isMounted) {
          sub.updater(data);
        }
      });
    },
    setStatus(status) {
      this.status = status;
      this.subscribers.forEach((sub) => {
        if (sub.isMounted) {
          sub.updater(status);
        }
      });
    },
    subscribe(updater) {
      this.subscribers.push({
        updater,
        isMounted: true,
      });
    },
    unsubscribe(updater) {
      this.subscribers = this.subscribers.filter((sub) => {
        if (sub.isMounted) sub.updater !== updater;
      });
    },
  };
}
