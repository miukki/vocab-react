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

export const sendVcode = () => {
  return { type: types.SEND_VCODE }
}

export const sendVcodeDone = () => {
  return { type: types.SEND_VCODE_DONE }
}

export const countdownVcode = () => {
  return { type: types.COUNTDOWN_VCODE }
}

export const changeVcode = vcode => {
  return { type: types.CHANGE_VCODE, payload: { vcode } }
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
