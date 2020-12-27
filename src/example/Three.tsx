import * as React from 'react';

import { useChip } from '../lib';

const Three: React.FC = () => {
  const authentication = useChip('authentication');

  return (
    <div>
      <div style={{ backgroundColor: 'red', margin: 4, padding: 4 }}>
        <p>authentication</p>
        <div>{JSON.stringify(authentication.data)}</div>
        <div>{authentication.status.type}</div>
      </div>
    </div>
  );
};

export default Three;
