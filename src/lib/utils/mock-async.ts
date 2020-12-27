import * as TS from '../../types';
import * as Type from '../../types';

export default function mockAsync<T = unknown>(value: T, timeout?: number) {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      if (value !== undefined) {
        resolve(value);
      } else {
        reject({ message: 'Error' });
      }
    }, timeout || 0);
  });
}
