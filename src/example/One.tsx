import * as React from 'react';
import mockAsync from 'src/lib/utils/mock-async';

import { useChipper } from '../lib';

const One: React.FC = () => {
  const one = useChipper('one');
  const one_A = useChipper('one.A');
  const one_B = useChipper('one.B');
  const two = useChipper('two');

  const onClick = () => {
    two.setData('dupa');
  };
  const onClickOne_A = () => {
    // one_A.setData('dupa');
    one_A.setData(mockAsync('dupa', 2000), {
      onError: () => console.log('error'),
      onSuccess: () => console.log('finish'),
    });
  };

  return (
    <div>
      <button onClick={onClick}>change two</button>
      <button onClick={onClickOne_A}>change one_a</button>

      <div style={{ backgroundColor: 'red' }}>
        <p>ONE</p>
        <div>{JSON.stringify(one.data)}</div>
        <div>{one.status.type}</div>
      </div>

      <div style={{ backgroundColor: 'red' }}>
        <p>ONE_A</p>
        <div>{JSON.stringify(one_A.data)}</div>
        <div>{one_A.status.type}</div>
      </div>

      <div style={{ backgroundColor: 'red' }}>
        <p>ONE_B</p>
        <div>{JSON.stringify(one_B.data)}</div>
        <div>{one_B.status.type}</div>
      </div>
    </div>
  );
};

export default One;
