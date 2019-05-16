import Validator from '../../../lib/Validator'

// status in boolean
export const selectShow = state => {
  return state.toJS().show
}

export const selectSubmitting = state => {
  return state.toJS().submitting
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

export const selectPassword = state => {
  return state.toJS().password
}

export const selectErrorTypes = state => {
  return Validator.getErrorTypes(state)
}
