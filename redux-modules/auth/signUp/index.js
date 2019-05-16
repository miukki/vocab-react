import _ from 'lodash'
import { fromJS } from 'immutable'
import types from './types'

export const initialState = fromJS({
  submitting: false,
  show: false,
  vcode: '',
  vcodeSending: false,
  vcodeSentAt: null,
  vcodeCountdown: 0,
  mobile: '',
  password: '',
  showPassword: false,
  error: {
    hitRateLimit: false,
    userAlreadyExist: false,
    wrongMobile: false,
    duplicateMobile: false,
    wrongVcode: false,
    weakPassword: false
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

    case types.SEND_VCODE:
      return state.set('vcodeSending', true)

    case types.SEND_VCODE_DONE:
      return state
        .set('vcodeSending', false)
        .set('vcodeSent', true)
        .set('vcodeCountdown', 120)
        .set('vcodeSentAt', Date.now())

    case types.COUNTDOWN_VCODE:
      return state.set('vcodeCountdown', 0)

    case types.CHANGE_VCODE:
      return state.set('vcode', action.payload.vcode)

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
      return state.set('submitting', false).set('vcodeSending', false)

    case types.DISMISS_ERROR:
      return state.set(
        'error',
        fromJS({
          hitRateLimit: false,
          userAlreadyExist: false,
          wrongMobile: false,
          duplicateMobile: false,
          wrongVcode: false,
          weakPassword: false
        })
      )

    default:
      return state
  }
}
