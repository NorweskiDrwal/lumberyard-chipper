import * as React from 'react';

import { useChip, useChipper } from '../lib';

const Three: React.FC = () => {
  const one = useChipper('one.A');

  return (
    <div>
      <div style={{ backgroundColor: 'red' }}>
        <p>ONE_A</p>
        {/* <div>{JSON.stringify(one.getData('one.A'))}</div> */}
        {/* <div>{one_A.status.type}</div> */}
      </div>
    </div>
  );
};

export default Three;
