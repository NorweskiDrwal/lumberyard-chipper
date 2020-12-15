import * as React from 'react';

const Trunk: React.FC = (props: any) => {
  console.log('props', props);

  return (
    <div
      style={{
        margin: 4,
        width: 300,
        height: '100%',
        display: 'flex',
        backgroundColor: 'red',
        alignItems: 'center',
        flexDirection: 'column-reverse',
      }}
    >
      <pre>data: {JSON.stringify(props.chipper.data)}</pre>
      <pre>status: {JSON.stringify(props.chipper.status)}</pre>
    </div>
  );
};

export default Trunk;
