import * as React from 'react';
import { mockAsync } from 'src/lib/utils';

import { useChip, useChipper } from '../lib';

const One: React.FC = () => {
  const authentication = useChipper('authentication');
  const user = useChip('authentication.tokens');
  const remote = useChip('authentication.tokens.remote');

  const onClick = () => {
    // authentication.setData((data) => {
    //   data.certificate = { alcohol: 2547, bodd: '123' };
    // });
    authentication.setData('dupa');

    authentication.chipper.setData(
      'location.place',
      mockAsync((data) => {
        data.geo = 'asdasd';
      }, 2000),
    );
  };
  const onClickOne = () => {
    authentication.setData(mockAsync({ certificate: { alcohol: 897878, bodd: 'gjnbojr' } }, 2000), {
      onInit: () => console.log('init'),
      onError: () => console.log('error'),
      onSuccess: () => console.log('finish'),
    });
  };

  return (
    <div>
      <div style={{ backgroundColor: 'red', margin: 4, padding: 4 }}>
        <button onClick={onClick}>change two via one</button>
        <button onClick={onClickOne}>async one</button>
        <p>authentication</p>
        <div>{JSON.stringify(authentication.data)}</div>
        <div>{authentication.status.type}</div>

        <div style={{ backgroundColor: 'brown', margin: 4, padding: 4 }}>
          <span>user</span>
          <div>{JSON.stringify(user.data)}</div>
          <div>{user.status.type}</div>
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
