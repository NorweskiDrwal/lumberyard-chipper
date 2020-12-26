import * as React from 'react';
import mockAsync from 'src/lib/utils/mock-async';

import { useChipper } from '../lib';

const Two: React.FC = () => {
  const one = useChipper('one');
  // const one_A = useChipper('one.A');
  const one_B = useChipper('one.B');
  const two = useChipper('two');

  const onClickOne = () => {
    one.setData('dupa');
  };
  const onClickOne_A = () => {
    // one_A.setData(mockAsync('sgerg', 2200));
  };
  const onClickOne_B = () => {
    one_B.setData('dupa');
  };

  console.log('two', two);

  return (
    <div>
      <button onClick={onClickOne}>change one</button>
      <button onClick={onClickOne_A}>change one_a</button>
      <button onClick={onClickOne_B}>change one_b</button>

      <div style={{ backgroundColor: 'red' }}>
        <p>TWO</p>
        <div>{JSON.stringify(two.data)}</div>
        <div>{two.status.type}</div>
      </div>
    </div>
  );
};

export default Two;
