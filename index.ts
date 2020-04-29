import React from 'react';

export const composeWrappers = (
  wrappers: React.FunctionComponent[]
): React.FunctionComponent => {
  return wrappers.reduce((Acc, Current): React.FunctionComponent => {
    return props => React.createElement(
      Current,
      null,
      React.createElement(Acc, props as any)
    );
  });
}
