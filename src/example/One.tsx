import * as React from 'react';
import mockAsync from 'src/lib/utils/mock-async';

import { useChip } from '../lib';

const One: React.FC = () => {
  const one = useChip('one');
  const two = useChip('two');
  const one_A = useChip('one.A');
  const one_B = useChip('one.B');

  const onClick = () => {
    //
    two.setData('asd');
  };
  const onClickOne = () => {
    one.setData(mockAsync('dupa', 2000), {
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
        <p>ONE</p>
        <div>{JSON.stringify(one.data)}</div>
        <div>{one.status.type}</div>
      </div>

      <div style={{ backgroundColor: 'red' }}>
        <p>ONE_A_CHIP</p>
        <div>{JSON.stringify(one_A.data)}</div>
        <div>{one_B.status.type}</div>
      </div>
    </div>
  );
};

export default One;
