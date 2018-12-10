import React from 'react';
import { hot } from 'react-hot-loader';

import Button from './components/Button';
import LinkButton from './components/LinkButton';
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header />
      <h1>Hello, world!</h1>
      <Button>button 1</Button>
      <Button color="red">button 2</Button>
      <LinkButton href="#" color="blue">button link</LinkButton>
    </div>
  );
}

export default hot(module)(App);
