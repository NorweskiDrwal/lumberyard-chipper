import * as React from 'react';

import { useChip } from '../lib';

const Two: React.FC = () => {
  const one_B = useChip('one.B');
  const two = useChip('two');

  const onClickOne_B = () => {
    // one_B.setData('dupa');
  };

  console.log('two', two);

  return (
    <div>
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
