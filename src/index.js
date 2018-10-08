import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import App from './components/App';
import { loadState, saveState } from './components/localStorage';


// Notes:
// if we have persisted state from the previous todo, we can use persistedState to hydrate it
// this will overwrite it with the values specified by the reducers.

const persistedState = loadState();
const store = createStore(
  todoApp,
  persistedState // this will end up as the initial state in the root reducer instead of undefined
);

store.subscribe(
  () => {
    saveState(
      store.getState()
    );
  }
);

console.log(`Initial Store state: `, store.getState());


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
