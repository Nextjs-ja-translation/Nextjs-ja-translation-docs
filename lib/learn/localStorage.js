import React from 'react';

function getStorage() {
  if (typeof window !== 'undefined') {
    try {
      return window.localStorage;
    } catch {
      // If localStorage is disabled, ignore the exception caused by reading it
    }
  }
  return {
    getItem: () => {},
    setItem: () => {},
    removeItem: () => {}
  };
}

const storage = getStorage();

let isLocalStorageReady = false;

export const getStoredValue = key => {
  try {
    return JSON.parse(storage.getItem(key));
  } catch (e) {
    // Ignore invalid JSON from localStorage
  }
};

export const useLocalStorage = (key, reducer, serverState) => {
  const [isReady, setIsReady] = React.useState(isLocalStorageReady);
  const [state, dispatch] = React.useReducer(
    reducer,
    (isReady && getStoredValue(key)) || serverState
  );

  // Defer the usage of localStorage after the initial render to avoid unmatching content
  React.useEffect(() => {
    if (!isReady) {
      setIsReady(true);
      isLocalStorageReady = true;

      const value = getStoredValue(key);

      dispatch({
        type: 'init',
        clientState: value,
        serverState
      });
    }
  }, [isReady, serverState]);

  React.useEffect(() => {
    if (state !== undefined) {
      const nextState = JSON.stringify(state);
      storage.setItem(key, nextState);
    } else {
      // If `state` is still undefined then maybe serverState is still not in use and therefore
      // the state is not yet ready
      setIsReady(false);
      storage.removeItem(key);
    }
  }, [state]);

  return [state, dispatch];
};
