import * as React from 'react';

import { plantSeed } from '../lib';
import One from './One';
import Two from './Two';

plantSeed('one', 'one data', {
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
});
plantSeed('two', 'two data');

const Example: React.FC = () => {
  return (
    <div>
      <One />
      <Two />
    </div>
  );
};

export default Example;
