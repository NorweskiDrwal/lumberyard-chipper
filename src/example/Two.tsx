import * as React from 'react';

import { useChip } from '../lib';

const Two: React.FC = () => {
  const location = useChip('location');
  const place = useChip('location.place');

  const onClick = () => {
    location.setData('wrberkjbiwr');
  };

  return (
    <div>
      <div style={{ backgroundColor: 'red', margin: 4, padding: 4 }}>
        <button onClick={onClick}>change two</button>
        <p>location</p>
        <div>{JSON.stringify(location.data)}</div>
        <div>{location.status.type}</div>

        <div style={{ backgroundColor: 'brown', margin: 4, padding: 4 }}>
          <p>place</p>
          <div>{JSON.stringify(place.data)}</div>
          <div>{place.status.type}</div>
        </div>
      </div>
    </div>
  );
};

export default Two;
