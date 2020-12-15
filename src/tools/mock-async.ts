import * as Type from '../types';

export function mockAsync<T = unknown>(value: T, timeout?: number): Type.IData<T> {
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
