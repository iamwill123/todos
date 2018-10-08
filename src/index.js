import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './configureStore';
import Root from './components/Root';

const store = configureStore(); // move configure store to separate file.

render(
  <Root store={store} />,
  document.getElementById('root')
);
