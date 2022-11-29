import React from 'react';

type Wrapper = React.FC<React.PropsWithChildren<{}>>;

export const composeWrappers = (
  wrappers: Wrapper[]
): Wrapper => {
  return wrappers.reduceRight((Acc, Current): Wrapper => {
    return props => React.createElement(
      Current,
      null,
      React.createElement(Acc, props as any)
    );
  });
}
