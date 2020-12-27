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
      <div style={{ backgroundColor: 'red', padding: 4 }}>
        <button onClick={onClick}>change</button>
        <button onClick={onClickOne}>change one</button>
        <p>authentication</p>
        <div>{JSON.stringify(authentication.data)}</div>
        <div>{authentication.status.type}</div>

        <div style={{ backgroundColor: 'brown', margin: 4, padding: 4 }}>
          <span>uid</span>
          <div>{JSON.stringify(uid.data)}</div>
          <div>{uid.status.type}</div>
        </div>

        <div style={{ backgroundColor: 'brown', margin: 4, padding: 4 }}>
          <span>remote</span>
          <div>{JSON.stringify(remote.data)}</div>
          <div>{remote.status.type}</div>
        </div>
      </div>
    </div>
  );
};

export default One;
