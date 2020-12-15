import * as React from 'react';
import { mockAsync } from 'src/tools/mock-async';
import { Chip } from 'src/types';
import Trunk from './Trunk';

const Main: Chip = (props) => {
  console.log('props', props);

  return (
    <div
      style={{
        height: '98vh',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <Trunk />
      <div
        style={{
          margin: 4,
          width: 300,
          height: '100%',
          display: 'flex',
          backgroundColor: 'blue',
          alignItems: 'center',
          flexDirection: 'column-reverse',
        }}
      >
        <button onClick={() => props.chipper.setData('dupa')}>set data</button>
        <button onClick={() => props.chipper.setAsyncData(mockAsync('dupa', 2000))}>
          set async
        </button>
      </div>
    </div>
  );
};

export default Main;
