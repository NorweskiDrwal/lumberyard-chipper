import * as React from 'react';

import { plantTree } from '../lib';
import One from './One';
import Two from './Two';
import Three from './Three';

plantTree(
  'authentication',
  { certificate: 'zzz000zz00z0' },
  {
    branches: [['tokens', { uid: '123456789', remote: 'd7gh473nd7' }]],
  },
);
plantTree('two', 'two data');

const Example: React.FC = () => {
  return (
    <div>
      <One />
      <Two />
      <Three />
    </div>
  );
};

export default Example;
