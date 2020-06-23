import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('JS', () => {
  const { getByText } = render(<App />);
  expect(getByText('P1: foo', {exact: false})).toBeInTheDocument();
  expect(getByText('P2: bar', {exact: false})).toBeInTheDocument();
  expect(getByText('P1 from wrapper: foo', {exact: false})).toBeInTheDocument();
  expect(getByText('P4 from wrapper: p4', {exact: false})).toBeInTheDocument();
  expect(getByText('P3: baz', {exact: false})).toBeInTheDocument();
  expect(getByText('P4: qaz', {exact: false})).toBeInTheDocument();
});
