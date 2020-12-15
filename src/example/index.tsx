import * as React from 'react';
import { Chip } from 'src/tools/Chip';
import Main from './components/Main';

const Loader = () => <>LOADING</>;

const App = () => {
  return (
    <Chip name="roots">
      <Main />
    </Chip>
  );
};

export default App;
