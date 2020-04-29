import React from 'react';

export const composeWrappers = (
  wrappers: React.FunctionComponent[]
): React.FunctionComponent => {
  return wrappers.reduce((Acc, Current): React.FunctionComponent => {
    return props => <Current><Acc {...props} /></Current>
  });
}
