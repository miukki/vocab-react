import _ from 'lodash'
import { fromJS } from 'immutable'
import types from './types'

export const initialState = fromJS({
  submitting: false,
  show: false,
  mobile: '',
  password: '',
  showPassword: false,
  error: {
    wrongMobile: false,
    userPasswordMismatch: false,
    serverError: false,
    networkError: false,
    otherError: false
  }
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RESET_STATE:
      state = initialState
      return state.set('show', false)

    case types.SHOW:
      return state.set('show', true)

    case types.HIDE:
      return state.set('show', false)

    case types.CHANGE_MOBILE:
      return state.set('mobile', action.payload.mobile)

    case types.CHANGE_PASSWORD:
      return state.set('password', action.payload.password)

    case types.SHOW_PASSWORD:
      return state.set('showPassword', true)

    case types.HIDE_PASSWORD:
      return state.set('showPassword', false)

    case types.SUBMIT:
      return state.set('submitting', true)

    case types.SUBMIT_DONE:
      return state.set('submitting', false)

    case types.SHOW_ERROR:
      _.forEach(action.payload.errorTypes, obj => {
        state = state.setIn(['error', obj.errorType], true)
      })
      return state.set('submitting', false)

    case types.DISMISS_ERROR:
      return state.set(
        'error',
        fromJS({
          wrongMobile: false,
          userPasswordMismatch: false
        })
      )

    default:
      return state
  }
}
