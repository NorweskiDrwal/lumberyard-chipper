/* eslint-disable @typescript-eslint/no-explicit-any */
import * as TS from '../../types';

export default async function setAsync<T>(
  async: Promise<T | void>,
  chip: TS.IChip<T>,
  actions?: TS.IAsyncActions<T>,
) {
  async function runAsync(): Promise<any> {
    let result = null;
    const isPromise = async instanceof Promise;

    if (isPromise) {
      await async
        .then((resp) => {
          result = resp;
        })
        .catch((error) => {
          result = 'ERROR';
          chip.setStatus({ type: 'ERROR', message: error });
        });
    }

    return result;
  }

  async function* createAsyncGenerator(actions?: TS.IAsyncActions<T>) {
    // runAsync_Load
    yield chip.setStatus({ type: 'LOAD' });
    // runAsync_Response
    const resp = await runAsync();
    yield await resp;
    // runAsync_SetData
    const data = actions?.responseWrap ? actions.responseWrap(resp) : resp;
    yield (chip.data = data);
    // runAsync_Success
    return chip.setStatus({ type: 'SUCCESS' });
  }

  const AsyncGenerator = createAsyncGenerator(actions);

  const runAsync_Load = AsyncGenerator.next();
  runAsync_Load;

  const runAsync_Response = await AsyncGenerator.next();
  if (runAsync_Response.value === 'ERROR') return actions?.onError && actions.onError();

  const runAsync_SetData = AsyncGenerator.next();
  runAsync_SetData;

  const runAsync_Success = AsyncGenerator.next();
  runAsync_Success;

  return actions?.onSuccess && actions.onSuccess();
}
