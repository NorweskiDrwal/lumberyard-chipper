import * as React from 'react';
import mockAsync from 'src/lib/utils/mock-async';

import { useChip } from '../lib';

const One: React.FC = () => {
  const authentication = useChip('authentication');
  const uid = useChip('authentication.tokens.uid');
  const remote = useChip('authentication.tokens.remote');

  const onClick = () => {
    //
  };
  const onClickOne = () => {
    authentication.setData(mockAsync('dupa', 2000), {
      onInit: () => console.log('init'),
      onError: () => console.log('error'),
      onSuccess: () => console.log('finish'),
    });
  };

  return (
    <div>
      <button onClick={onClick}>change</button>
      <button onClick={onClickOne}>change one</button>

      <div style={{ backgroundColor: 'red' }}>
        <p>authentication</p>
        <div>{JSON.stringify(authentication.data)}</div>
        <div>{authentication.status.type}</div>
      </div>

      <div style={{ backgroundColor: 'red' }}>
        <p>uid</p>
        <div>{JSON.stringify(uid.data)}</div>
        <div>{uid.status.type}</div>
      </div>

      <div style={{ backgroundColor: 'red' }}>
        <p>remote</p>
        <div>{JSON.stringify(remote.data)}</div>
        <div>{remote.status.type}</div>
      </div>
    </div>
  );
};

export default One;
