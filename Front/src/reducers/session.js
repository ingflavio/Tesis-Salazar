export const initialState = JSON.parse(window.localStorage.getItem('session')) || null;

const updateLocalStorage = (state) => {
  localStorage.setItem('session', JSON.stringify(state));
};

export const ACCOUNT_ACTION_TYPE = {
  LOGIN: 'LOGIN',
  LOG_OUT: 'LOG_OUT',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
};

export const UPDATE_STATE_BY_ACTION = {
  [ACCOUNT_ACTION_TYPE.LOGIN]: (state, action) => {
    // action.payload debe ser { token, cedula, rol }
    return action.payload;
  },
  [ACCOUNT_ACTION_TYPE.LOG_OUT]: () => null,
  [ACCOUNT_ACTION_TYPE.SET_LOADING]: (state, action) => ({
    ...state,
    loading: action.payload,
  }),
  [ACCOUNT_ACTION_TYPE.SET_ERROR]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
};

export const reducerUser = (state, action) => {
  const { type } = action;
  const updateState = UPDATE_STATE_BY_ACTION[type];
  const newState = updateState ? updateState(state, action) : state;
  // Solo persistimos si no es un estado de loading/error (para no guardar esos flags)
  if (type === ACCOUNT_ACTION_TYPE.LOGIN || type === ACCOUNT_ACTION_TYPE.LOG_OUT) {
    updateLocalStorage(newState);
  }
  return newState;
};