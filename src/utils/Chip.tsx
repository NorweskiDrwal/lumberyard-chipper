import * as React from 'react';

import useChip from 'src/utils/use-chip';

interface IChipProps {
  name: string;
  component?: React.ElementType;
  renderLoader?: React.ElementType;
}

const Chip: React.FC<IChipProps> = ({
  component: Component,
  renderLoader: LoaderComponent,
  ...props
}) => {
  const chip = useChip(props.name);

  if (LoaderComponent && chip.status.type === 'LOAD') {
    return <LoaderComponent />;
  }

  if (Component) {
    return <Component {...props} chip={chip} />;
  }

  const Chips = React.Children.map(
    props.children as React.ReactElement,
    ({ type: ChippedComponent, props }: React.ReactElement) => {
      return <ChippedComponent {...props} chip={chip} />;
    },
  );

  return <>{Chips}</>;
};

export default Chip;
