react-compose-wrappers
===

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

This package solves the issue of many providers forcing indentation runoffs.

### Problem

Here's how a simple component can evolve to:

```ts
const MyApp: React.FunctionComponent = () => {
  const foo: Foo = { /* ... */ };
  const bar: Bar = { /* ... */ };
  const baz: Baz = { /* ... */ };
  return (
    <FooContext.Provider value={foo}>
      <BarContext.Provider value={bar}>
        <BazContext.Provider value={foo}>
          <MainComponent />
        </BazContext.Provider>
      </BarContext.Provider>
    </FooContext.Provider>
  );
}
```

Now when the user adds a `ApolloProvider` and `react-intl`, we need to keep wrapping our components.

```ts
const MyApp: React.FunctionComponent = () => {
  const locale = getLocale()
  const messages = getMessages(locale);
  const client = getApolloClient();
  const foo: Foo = { /* ... */ };
  const bar: Bar = { /* ... */ };
  const baz: Baz = { /* ... */ };
  return (
    <IntlProvider locale={locale} messages={messages}>
      <ApolloProvider client={client}>
        <FooContext.Provider value={foo}>
          <BarContext.Provider value={bar}>
            <BazContext.Provider value={foo}>
              <MainComponent />
            </BazContext.Provider>
          </BarContext.Provider>
        </FooContext.Provider>
      </ApolloProvider>
    </IntlProvider>
  );
}
```

### Solution

This makes our component noisy and needlessly nested. This library fixes that by allowing you to specify the wrapping strategy without needing to indent or alter the rendering code:

```tsx
import { composeWrappers } from 'react-compose-wrappers';

const MyApp: React.FunctionComponent = () => {
  const locale = getLocale()
  const messages = getMessages(locale);
  const client = getApolloClient();
  const foo: Foo = { /* ... */ };
  const bar: Bar = { /* ... */ };
  const baz: Baz = { /* ... */ };

  const SuperProvider = composeWrappers([

                           // Note: children can be passed via children={props.children}
    props => <IntlProvider locale={locale} messages={messages} children={props.children} />,

         // Or the usual way of <MyComponent>{props.children}</MyComponent>
    props => <ApolloProvider client={client}>{props.children}</ApolloProvider>,

    props => <FooContext.Provider value={foo}>{props.children}</FooContext.Provider>,
    props => <BarContext.Provider value={bar}>{props.children}</BarContext.Provider>,
    props => <BazContext.Provider value={baz}>{props.children}</BazContext.Provider>,
  ]);

  return (
    <SuperProvider>
      <MainComponent />
    </SuperProvider>
  );
}
```

Now when a new wrapper or provider is needed, you only need to alter that array with how the component should be wrapped.

[npm-image]: https://img.shields.io/npm/v/react-compose-wrappers.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-compose-wrappers
[travis-image]: https://img.shields.io/travis/kolodny/react-compose-wrappers.svg?style=flat-square
[travis-url]: https://travis-ci.org/kolodny/react-compose-wrappers
[downloads-image]: http://img.shields.io/npm/dm/react-compose-wrappers.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/react-compose-wrappers
