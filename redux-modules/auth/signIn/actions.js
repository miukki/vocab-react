import types from './types'

export const show = () => {
  return { type: types.SHOW }
}
export const hide = () => {
  return { type: types.HIDE }
}

export const changeMobile = mobile => {
  return { type: types.CHANGE_MOBILE, payload: { mobile } }
}

export const changePassword = password => {
  return { type: types.CHANGE_PASSWORD, payload: { password } }
}

export const showPassword = () => {
  return { type: types.SHOW_PASSWORD }
}

export const hidePassword = () => {
  return { type: types.HIDE_PASSWORD }
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

export const goForgotPassword = () => {
  return { type: types.GO_FORGOT_PASSWORD }
}
