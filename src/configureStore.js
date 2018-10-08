import { createStore } from 'redux';
import todoApp from './reducers';
import { loadState, saveState } from './components/localStorage';
import throttle from 'lodash/throttle';

const configureStore = () => {
  // Notes:
  // if we have persisted state from the previous todo, we can use persistedState to hydrate it
  // this will overwrite it with the values specified by the reducers.

  const persistedState = loadState();
  const store = createStore(
    todoApp,
    persistedState // this will end up as the initial state in the root reducer instead of undefined
  );

  // The store subscribe method will be invoked any time the store state changes
  // Below we are preserving the data and the UI state.
  // store.subscribe(() => saveState(store.getState()) );

  // We want to preserve the data and not the UI state, so the filterlist will not be persisted.
  // Here we can calling saveState everytime the store state changes, this is expensive.
  store.subscribe(throttle(() => { // using throttle, the store will be called at most, once a second.
    saveState({
      todos: store.getState().todos
    });
  }, 1000));

  console.log(`Initial Store state: `, store.getState());

  return store;
};

export default configureStore;