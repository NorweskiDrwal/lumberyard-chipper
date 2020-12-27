import * as React from 'react';

import { plantSeed } from '../lib';
import One from './One';
import Two from './Two';
import Three from './Three';

plantSeed(
  'one',
  {
    id: 'otis',
  },
  {
    branches: [
      ['A', '1234567890'],
      [
        'B',
        {
          something: {
            else: {
              entirely: 'hello',
            },
            bolobo: 'nono',
          },
          dudu: 'qwe',
        },
      ],
    ],
  },
);
plantSeed('two', 'two data');

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
