/* eslint-disable @typescript-eslint/no-explicit-any */

import * as TS from '../types';

export default async function setAsync<State>(
  async: Promise<TS.IData<State> | void>,
  chip: TS.IChip<State>,
  actions?: TS.IAsyncActions<State>,
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

  async function* createAsyncGenerator(actions?: TS.IAsyncActions<State>) {
    // runAsyncAction_onInit
    yield actions?.onInit && actions.onInit();
    // runAsync_Load
    yield chip.setStatus({ type: 'LOAD' });
    // runAsync_Response
    const resp = await runAsync();
    yield await resp;
    // runAsyncAction_onError
    if (resp === 'ERROR') return actions?.onError && actions.onError();
    yield;
    // runAsync_SetData
    const data = actions?.responseWrap ? actions.responseWrap(resp) : resp;
    yield (chip.data = data);
    // runAsync_Success
    yield chip.setStatus({ type: 'SUCCESS' });
    // runAsyncAction_onSuccess
    return actions?.onSuccess && actions.onSuccess();
  }

  const AsyncGenerator = createAsyncGenerator(actions);

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
