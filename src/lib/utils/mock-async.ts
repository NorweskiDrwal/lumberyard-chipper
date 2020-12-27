/* eslint-disable @typescript-eslint/no-explicit-any */

export default function mockAsync<T = any>(value: T, timeout?: number) {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      if (value !== undefined) resolve(value);
      else reject({ message: 'Oops! Something went wrong' });
    }, timeout || 0);
  });
}
