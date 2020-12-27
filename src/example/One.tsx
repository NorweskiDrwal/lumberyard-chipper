import * as React from 'react';
import mockAsync from 'src/lib/utils/mock-async';

import { useChip, useChipper } from '../lib';

const One: React.FC = () => {
  const one = useChip('one');
  // const one = useChip('one');
  // const one_A = useChip('one.A');
  // const one_B = useChip('one.B');
  // const two = useChip('two');

  const onClick = () => {
    one.setData((data) => {
      data.id = 'something';
    });
    // one.setChip(({ data }) => {
    //   data.dupa = 'something';
    // });
  };
  const onClickOne = () => {
    // one_A.setData('dupa');
    // one.setData(mockAsync('dupa', 2000), {
    //   onInit: () => console.log('init'),
    //   onError: () => console.log('error'),
    //   onSuccess: () => console.log('finish'),
    // });
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
        <p>ONE_A_CHIPPER</p>
        {/* <div>{JSON.stringify(one.getData('one.A'))}</div> */}
        {/* <div>{one_A.status.type}</div> */}
      </div>

      <div style={{ backgroundColor: 'red' }}>
        <p>ONE_A_CHIP</p>
        {/* <div>{JSON.stringify(one_A.data)}</div> */}
        {/* <div>{one_B.status.type}</div> */}
      </div>
    </div>
  );
};

export default One;
