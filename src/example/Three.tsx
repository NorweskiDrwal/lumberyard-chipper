import * as React from 'react';

import { useChip } from '../lib';

const Three: React.FC = () => {
  const one = useChip('one');

  return (
    <div>
      <div style={{ backgroundColor: 'red' }}>
        <p>ONE</p>
        <div>{JSON.stringify(one.data)}</div>
        <div>{one.status.type}</div>
      </div>
    </div>
  );
};

export default Three;
