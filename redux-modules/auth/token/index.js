import { fromJS } from 'immutable'
import types from './types'

export const initialState = fromJS({
  jwt: null
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_JWT:
      return state.set('jwt', action.payload.jwt)

    case types.DELETE_JWT:
      return state.set('jwt', null)

    default:
      return state
  }
}
