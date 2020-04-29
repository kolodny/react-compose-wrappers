import React from 'react';
import { composeWrappers } from 'react-compose-wrappers';

const P1 = React.createContext({p1: 'P1'});
const P2 = React.createContext({p2: 'P2'});
const P3 = React.createContext({p3: 'P3'});
const P4 = React.createContext({p4: 'P4'});

const Sub = () => {
  const p1 = React.useContext(P1)
  const p2 = React.useContext(P2)
  const p3 = React.useContext(P3)
  const p4 = React.useContext(P4)
  return <pre>
    P1: {p1.p1} <br />
    P2: {p2.p2} <br />
    P3: {p3.p3} <br />
    P4: {p4.p4} <br />
  </pre>
}

const App = () => {
  const MasterProvider = composeWrappers([
    props => <P1.Provider value={{p1: 'foo'}} children={props.children} />,
    props => <P2.Provider value={{p2: 'bar'}}>{props.children}</P2.Provider>,
    props => <P3.Provider value={{p3: 'baz'}}>{props.children}</P3.Provider>,
    props => <P4.Provider value={{p4: 'qaz'}}>{props.children}</P4.Provider>,
  ]);
  return (
    <MasterProvider>
      <Sub />
    </MasterProvider>
  );
}

export default App;
