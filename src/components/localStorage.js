const loadState = () => {
  try {
    const serializeState = localStorage.getItem('state');
    if (serializeState === null) {
      return undefined;
    }
    return JSON.parse(serializeState); // JSON parse is expensive to run.
  } catch (error) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializeState = JSON.stringify(state);
    localStorage.setItem('state', serializeState);
  } catch (error) {
    console.log(`saveState error,`, error);
  }
};

export { loadState, saveState };