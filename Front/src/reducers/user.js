export const initialState = JSON.parse(window.localStorage.getItem('user')) || null

const updateLocalStorage = (state) => {
  localStorage.setItem('user', JSON.stringify(state))
}

export const ACCOUNT_ACTION_TYPE = {
  LOGIN: 'LOGIN',
  LOG_OUT: 'LOG_OUT'
}

export const UPDATE_STATE_BY_ACTION = {
  [ACCOUNT_ACTION_TYPE.LOGIN]: (state, action) => {
    return action.playload
  },
  [ACCOUNT_ACTION_TYPE.LOG_OUT]: () => {
    return null
  }
}

export const reducerUser = (state, action) => {
  const { type } = action
  const updateState = UPDATE_STATE_BY_ACTION[type] 
  const newState = updateState ? updateState(state, action) : state
  updateLocalStorage(newState)
  return newState
}