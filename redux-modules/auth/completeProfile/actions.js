import types from './types'

export const show = () => {
  return { type: types.SHOW }
}
export const hide = () => {
  return { type: types.HIDE }
}

export const changeName = name => {
  return { type: types.CHANGE_NAME, payload: { name } }
}

export const submit = () => {
  return { type: types.SUBMIT }
}

export const submitDone = () => {
  return { type: types.SUBMIT_DONE }
}

export const showError = errorType => {
  return { type: types.SHOW_ERROR, payload: { errorType } }
}

export const dismissError = () => {
  return { type: types.DISMISS_ERROR }
}
