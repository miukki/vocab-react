import _ from 'lodash'
import { fromJS } from 'immutable'
import types from './types'

const initialState = fromJS({
  submitting: false,
  show: false,
  name: '',
  error: {
    wrongName: false
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

    case types.CHANGE_NAME:
      return state.set('name', action.payload.name)

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
          wrongName: false
        })
      )

    default:
      return state
  }
}
