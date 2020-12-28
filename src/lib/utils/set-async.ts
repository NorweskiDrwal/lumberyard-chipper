/* eslint-disable @typescript-eslint/no-explicit-any */

import produce from 'immer';
import * as TS from '../types';

export default async function setAsync<State>(
  async: Promise<TS.IData<State> | void>,
  chip: TS.IChip<State>,
  asyncActions?: TS.IAsyncActions<State>,
) {
  async function runAsync(): Promise<TS.IData<State>> {
    try {
      const resp = await async;
      return resp || null;
    } catch (error) {
      chip.setStatus({ type: 'ERROR', message: error });
      return 'ERROR';
    }
  }

  async function* createAsyncGenerator(asyncActions?: TS.IAsyncActions<State>) {
    // runAsyncAction_onInit
    yield asyncActions?.onInit && asyncActions.onInit();
    // runAsync_Load
    yield chip.setStatus({ type: 'LOAD' });
    // runAsync_Response
    const resp = await runAsync();
    yield await resp;
    // runAsyncAction_onError
    if (resp === 'ERROR') return asyncActions?.onError && asyncActions.onError();
    yield;
    // runAsync_SetData
    const update = asyncActions?.responseWrap ? asyncActions.responseWrap(resp) : resp;
    if (typeof update === 'function') {
      if (typeof chip.data === 'string') yield ((chip.data as any) = produce({}, update as any));
      else yield ((chip.data as any) = produce(chip.data, update as any));
    } else yield (chip.data = update);
    // runAsync_Success
    yield chip.setStatus({ type: 'SUCCESS' });
    // runAsyncAction_onSuccess
    return asyncActions?.onSuccess && asyncActions.onSuccess();
  }

  const AsyncGenerator = createAsyncGenerator(asyncActions);

  const runAsyncAction_onInit = AsyncGenerator.next();
  runAsyncAction_onInit;
  const runAsync_Load = AsyncGenerator.next();
  runAsync_Load;
  const runAsync_Response = await AsyncGenerator.next();
  runAsync_Response;
  const runAsyncAction_onError = AsyncGenerator.next();
  runAsyncAction_onError;
  const runAsync_SetData = AsyncGenerator.next();
  runAsync_SetData;
  const runAsync_Success = AsyncGenerator.next();
  runAsync_Success;
  const runAsyncAction_onSuccess = AsyncGenerator.next();
  runAsyncAction_onSuccess;
}
