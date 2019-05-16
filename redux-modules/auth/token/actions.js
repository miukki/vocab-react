import types from './types'

export const deleteJWT = () => {
  return (dispatch, getState) => {
    return window.Storage.deleteJWT().then(() => {
      dispatch({ type: types.DELETE_JWT })
    })
  }
}

export const setJWT = jwt => {
  return { type: types.SET_JWT, payload: { jwt } }
}
