import Validator from '../../../lib/Validator'
// status in boolean

export const selectShow = state => {
  return state.toJS().show
}

export const selectSubmitting = state => {
  return state.toJS().submitting
}

export const selectHasError = state => {
  return Validator.isAnyValidateError(state.toJS().error)
}

// values
export const selectName = state => {
  return state.toJS().name
}

export const selectErrorTypes = state => {
  return Validator.getErrorTypes(state)
}
