import Validator from '../../../lib/Validator'

// status in boolean
export const selectShow = state => {
  return state.toJS().show
}

export const selectSubmitting = state => {
  return state.toJS().submitting
}

export const selectVcodeSending = state => {
  return state.toJS().vcodeSending
}

export const selectVcodeSentAt = state => {
  return state.toJS().vcodeSentAt
}

export const selectVcodeDisabled = state => {
  return state.toJS().vcodeCountdown > 0 || selectVcodeSending(state)
}

export const selectShowPassword = state => {
  return state.toJS().showPassword
}

export const selectHasError = state => {
  return Validator.isAnyValidateError(state.toJS().error)
}

// values
export const selectMobile = state => {
  return state.toJS().mobile
}

export const selectVcode = state => {
  return state.toJS().vcode
}

export const selectVcodeCountdown = state => {
  return state.toJS().vcodeCountdown
}

export const selectPassword = state => {
  return state.toJS().password
}

export const selectErrorTypes = state => {
  return Validator.getErrorTypes(state)
}
