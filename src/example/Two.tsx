import * as React from 'react';

import { useChip } from '../lib';

const Two: React.FC = () => {
  const two = useChip('two');

  const onClick = () => {
    two.setData('wrberkjbiwr');
  };

  return (
    <div>
      <button onClick={onClick}>change two</button>

      <div style={{ backgroundColor: 'red' }}>
        <p>TWO</p>
        <div>{JSON.stringify(two.data)}</div>
        <div>{two.status.type}</div>
      </div>
    </div>
  );
};

export default Two;
