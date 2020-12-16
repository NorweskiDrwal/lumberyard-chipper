import * as Type from '../types';

export default async function setAsync<T>(
  async: Promise<T | void>,
  chip: Type.IChip<T>,
  actions?: Type.IAsyncActions<T>,
) {
  async function runAsync() {
    let result = null;
    const isPromise = async instanceof Promise;

    if (isPromise) {
      await async
        .then((resp) => {
          result = resp;
        })
        .catch((error) => {
          chip.setStatus({ type: 'ERROR', message: error });
          result = 'ERROR';
        });
    }

    return result;
  }

  async function* createAsyncGenerator() {
    yield chip.setStatus({ type: 'LOAD', message: undefined });
    //
    const resp = await runAsync();
    if (resp === undefined || resp === 'ERROR') return null;
    yield await resp;
    //
    const data = actions?.responseWrap ? actions.responseWrap(resp) : resp;
    yield chip.setData(data);
    //
    return chip.setStatus({ type: 'SUCCESS', message: undefined });
  }

  const AsyncGenerator = createAsyncGenerator();

  const runAsync_Load = AsyncGenerator.next();
  runAsync_Load;

  const runAsync_Response = await AsyncGenerator.next();
  if (runAsync_Response === undefined) return;

  const setAsync_Data = AsyncGenerator.next();
  setAsync_Data;

  const runAsync_Success = AsyncGenerator.next();
  runAsync_Success;

  return;
}
